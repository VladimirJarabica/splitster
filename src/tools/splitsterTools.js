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
} from '../types'

import defaultConfig, { defaultTestConfig } from './defaultConfig'

import type { Tests, TestOptions } from '../containers/Test'
import { constructTest } from '../containers/Test'

import type { UserGroups } from '../containers/UserGroup'
import { constructUserGroup } from '../containers/UserGroup'
import { getUserGroup, checkUserToUserGroup } from './userGroupsTools'

export const mergeDefaultTests = (tests: TestsConfig): TestsConfig =>
  R.map(R.mergeDeepRight(defaultTestConfig), tests)

export const mergeDefaultConfig = (config: Config): Config =>
  R.mergeDeepLeft(config, defaultConfig)

export const createTestsOpts = (def: string): TestOptions => ({
  winningVariant: def || null,
})

export type TestFromConfigOpts = {
  tracks?: TracksConfig,
  def?: SaveResults,
  separate?: boolean,
  runTest?: number,
  userGroups?: UserGroups,
  user: ?Object,
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

export const disableBySeparateTests = ({
  runTest,
  separate = false,
}: TestFromConfigOpts) => (tests: TestsConfig = {}): TestsConfig => {
  if (!separate) return tests

  const separateRunTestId = getSeparateRunTestId(tests, runTest)

  return R.mapObjIndexed((test: TestConfig, key: TestId) => {
    if (test.disabled || key === separateRunTestId) {
      return test
    }
    return R.merge(test, {
      disabledReason: 'separate_test',
      disabled: true,
    })
    // return R.assoc('disabled', key !== separateRunTestId, test),
  }, tests)
}

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

export const setReasonIfDisabled = (tests: TestsConfig = {}): Tests =>
  R.map((test: TestConfig) => {
    if (test.disabled) {
      console.log("disabled")
      return R.assoc('disabledReason', 'config', test)
    }
    return test
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

export const disableByUserGroups = (userGroups: ?UserGroups, user: ?Object) => (
  tests: TestsConfig,
): TestsConfig => {
  if (!user || R.isEmpty(user)) {
    return tests
  }
  return R.map((test: TestConfig) => {
    if (test.disabled) {
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

export const disableByUsage = (
  tests: TestsConfig,
  testRandom?: number,
): TestsConfig =>
  R.map((test: TestConfig) => {
    if (test.disabled || R.isNil(test.usage)) {
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

export const getTestsFromConfig = (
  tests: TestsConfig = {},
  opts: TestFromConfigOpts,
): Tests => {
  const { def, userGroups, user } = opts
  if (def && !R.isEmpty(def)) {
    return getNormalTests(opts)(tests)
  }
  return R.compose(
    getNormalTests(opts),
    disableByUsage,
    disableBySeparateTests(opts),
    disableByUserGroups(userGroups, user),
    setReasonIfDisabled,
    mergeDefaultTests,
  )(tests)
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
