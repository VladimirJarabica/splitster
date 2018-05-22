// @flow
import R from 'ramda'
import Random from 'random-js'

import type {
  Config,
  TestId,
  TestConfig,
  TestsConfig,
  TestUserGroupConfig,
  UserGroupsConfig,
  TracksConfig,
  SaveResults,
  DisabledReason,
} from '../types'

import defaultConfig, { defaultTestConfig } from './defaultConfig'

import type { Tests, TestOptions } from '../containers/Test'
import { constructTest } from '../containers/Test'

import type { UserGroups } from '../containers/UserGroup'
import { constructUserGroup } from '../containers/UserGroup'
import { getUserGroup, checkUserToUserGroup } from './userGroupsTools'

export type TestFromConfigOpts = {
  tracks?: TracksConfig,
  def?: SaveResults,
  separate?: boolean,
  runTest?: number,
  userGroups?: UserGroups,
  user: ?Object,
}

export const mergeDefaultTests = (tests: TestsConfig): TestsConfig =>
{
  console.log("mergeDefaultTests", defaultTestConfig, R.map(R.mergeDeepRight(defaultTestConfig), tests))
  return R.map(R.mergeDeepRight(defaultTestConfig), tests)
}

export const mergeDefaultConfig = (config: Config): Config =>
  R.mergeDeepLeft(config, defaultConfig)

export const createTestsOpts = (def: string): TestOptions => ({
  winningVariant: def || null,
})

// If test is set to disabled config (or wrong 'null'), it will consider as rewritable in cookies
export const testDefProperlySet = (testId: TestId, def: ?SaveResults) =>
  R.has(testId, def) &&
  def[testId] !== '__disabled_config' &&
  def[testId] !== '__disabled_null'

/**
 * Permanently disable all tests, if '__disabled_dev' is present in def
 * TODO: document
 */
export const disableByDev = (def: ?SaveResults = {}) => (
  tests: TestsConfig,
): TestsConfig =>
  R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (def[testId] && def[testId] === '__disabled_dev') {
      return R.merge(test, {
        disabled: true,
        disabledReason: 'dev',
      })
    }
    return test
  }, tests)

export const disableByConfig = (tests: TestsConfig): TestsConfig =>
  R.mapObjIndexed((test: TestConfig) => {
    // Disabled by config and not already with reason set
    if (test.disabled && !test.disabledReason) {
      return R.merge(test, {
        disabled: true,
        disabledReason: 'config',
      })
    }
    return test
  }, tests)

export const disableTestByDeadline = (test: TestConfig): TestConfig => {
  if (test.disabled || !test.deadline) {
    return test
  }
  if (new Date(test.deadline) < new Date()) {
    return R.compose(
      R.assoc('disabledReason', 'deadline'),
      R.assoc('disabled', true),
    )(test)
  }
  return test
}

export const disableByDeadline: TestsConfig => TestsConfig = R.map(
  disableTestByDeadline,
)

export const checkDisabled = (def: ?string) => {
  if (!def) {
    return {
      disabled: false,
      disabledReason: null,
    }
  }
  const [_, disabled, reason] = R.match(/^(__disabled_)(\w+)$/, def)
  const reasons: DisabledReason[] = [
    'usage',
    'separate_test',
    'user_group',
    'deadline',
    'dev',
  ]

  if (Boolean(disabled) && R.contains(reason, reasons)) {
    return {
      disabled: true,
      // TODO: temporary fix, remove 'null'
      disabledReason: reason === 'null' ? 'config' : reason,
    }
  }
  return {
    disabled: false,
    disabledReason: null,
  }
}

export const disableByDef = (def: ?SaveResults = {}) => (
  tests: TestsConfig,
): TestsConfig =>
  R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (test.disabled) {
      return test
    }
    return R.merge(test, checkDisabled(def[testId]))
  })(tests)

export const passTestUserGroups = (
  testUserGroup: TestUserGroupConfig = '',
  userGroups: UserGroups,
  user: Object,
): boolean => {
  if (R.isEmpty(testUserGroup)) return true

  if (Array.isArray(testUserGroup)) {
    return R.allPass(
      R.map(
        (_testUserGroup: TestUserGroupConfig) =>
          R.partial(passTestUserGroups, [_testUserGroup, userGroups]),
        testUserGroup,
      ),
    )(user)
  }

  if (typeof testUserGroup === 'string') {
    return checkUserToUserGroup(user, userGroups[testUserGroup])
  }

  return checkUserToUserGroup(user, getUserGroup(testUserGroup))
}
export const disableByUserGroups = (
  userGroups: ?UserGroups,
  user: ?Object,
  def: ?SaveResults = {},
) => (tests: TestsConfig): TestsConfig => {
  if (!user || R.isEmpty(user)) {
    return tests
  }
  return R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (testDefProperlySet(testId, def) || test.disabled) {
      return test
    }

    const disabledByUserGroups = R.not(
      passTestUserGroups(test.userGroup, userGroups || {}, user || {}),
    )
    return R.compose(
      R.assoc('disabledReason', disabledByUserGroups ? 'user_group' : null),
      R.assoc('disabled', disabledByUserGroups),
    )(test)
  }, tests)
}

/**
 * Get id of test, which will be ran in separate mode.
 */
export const getSeparateRunTestId = (tests: TestsConfig, runTest: ?number) => {
  const enabledTestsIds = R.compose(
    R.filter(Boolean),
    R.values,
    R.mapObjIndexed(
      (test: TestConfig, key: TestId) => (test.disabled ? null : key),
    ),
  )(tests)
  const runTestNumber = Number.isInteger(runTest)
    ? runTest
    : Random.integer(0, enabledTestsIds.length - 1)(Random.engines.nativeMath)
  return enabledTestsIds[runTestNumber]
}

export const disableBySeparateTests = (
  { runTest, separate = false }: TestFromConfigOpts,
  def: ?SaveResults = {},
) => (tests: TestsConfig = {}): TestsConfig => {
  if (!separate) return tests

  const separateRunTestId = getSeparateRunTestId(tests, runTest)

  return R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (
      testDefProperlySet(testId, def) ||
      test.disabled ||
      testId === separateRunTestId
    ) {
      return test
    }
    return R.merge(test, {
      disabledReason: 'separate_test',
      disabled: true,
    })
  }, tests)
}

export const disableByUsage = (def: ?SaveResults = {}) => (
  tests: TestsConfig,
  testRandom?: number,
): TestsConfig =>
  R.mapObjIndexed((test: TestConfig, testId: TestId) => {
    if (
      testDefProperlySet(testId, def) ||
      test.disabled ||
      R.isNil(test.usage)
    ) {
      return test
    }
    const rand = testRandom || Random.integer(0, 99)(Random.engines.nativeMath)
    if (rand >= test.usage) {
      return R.merge(test, {
        disabled: true,
        disabledReason: 'usage',
      })
    }
    return test
  }, tests)

// TODO: write tests
export const getNormalTests = ({
  tracks = {},
  def = {},
}: TestFromConfigOpts) => (tests: TestsConfig = {}): Tests =>
  R.reduce(
    (acc: Tests, key: string): Tests =>
      R.assoc(
        key,
        constructTest(key, tests[key], tracks, createTestsOpts(def[key])),
        acc,
      ),
    {},
    R.keys(tests),
  )

export const getTestsFromConfig = (
  tests: TestsConfig = {},
  opts: TestFromConfigOpts,
): Tests => {
  // TODO: consider checking one by one
  // TODO: change from __disabled_config to another, if disabled in config has changed
  const { def, userGroups, user } = opts

  const res = R.compose(
    getNormalTests(opts), // construct tests
    disableByUsage(def), // disable by usage
    disableBySeparateTests(opts, def), // disable by separate tests
    disableByUserGroups(userGroups, user, def), // disable by user group
    disableByDeadline,
    disableByConfig, // set disabled by default or config
    disableByDef(def),
    disableByDev(def),
    mergeDefaultTests,
  )(tests)
  console.log("res", res)
  return res
}

export const getUserGroupsFromConfig = (
  userGroups: UserGroupsConfig = {},
): UserGroups =>
  R.reduce(
    (acc: UserGroups, key: string): UserGroups =>
      R.assoc(key, constructUserGroup(userGroups[key]), acc),
    {},
    R.keys(userGroups),
  )
