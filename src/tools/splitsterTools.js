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

import defaultConfig from './defaultConfig'

import type { Tests, TestOptions } from '../containers/Test'
import { constructTest } from '../containers/Test'

import type { UserGroups } from '../containers/UserGroup'
import { constructUserGroup } from '../containers/UserGroup'
import { getUserGroup, checkUserToUserGroup } from './userGroupsTools'

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
  user?: user,
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

  return R.mapObjIndexed(
    (test: TestConfig, key: TestId) =>
      R.assoc('disabled', key !== separateRunTestId, test),
    tests,
  )
}

// TODO: write tests
export const getNormalTests = ({
  tracks = {},
  def = {},
}: TestFromConfigOpts) => (tests: TestsConfig = {}): TestsConfig =>
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
    return R.assoc(
      'disabled',
      test.disabled ||
        R.not(passTestUserGroups(test.userGroup, userGroups, user)),
      test,
    )
  }, tests)
}

export const getTestsFromConfig = (
  tests: TestsConfig = {},
  opts: TestFromConfigOpts,
) => {
  const { def, userGroups, user } = opts

  if (def) {
    return getNormalTests(opts)(tests)
  }

  return R.compose(
    getNormalTests(opts),
    disableBySeparateTests(opts),
    disableByUserGroups(userGroups, user),
  )(tests)
}

export const getUserGroupsFromConfig = (
  userGroups: UserGroupsConfig = {},
): UserGroups => {
  return R.reduce(
    (acc: UserGroups, key: string): UserGroups =>
      R.assoc(key, constructUserGroup(userGroups[key]), acc),
    {},
    R.keys(userGroups),
  )
}
