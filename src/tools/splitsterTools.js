// @flow
import R from 'ramda'
import Random from 'random-js'

import type {
  Config,
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

export const createTestsOpts = (
  def: string,
  disabled: boolean = false,
): TestOptions => ({
  disabled,
  winningVariant: disabled ? '__disabled' : def,
})

export type TestFromConfigOpts = {
  tracks?: TracksConfig,
  def?: SaveResults,
  separate?: boolean,
  runTest?: number,
  userGroups?: UserGroups,
  user?: user,
}

// TODO: write tests
export const getSeparateTests = (
  tests: TestsConfig = {},
  { runTest = 0, def = {}, tracks = {} }: TestFromConfigOpts,
) =>
  R.addIndex(R.reduce)(
    (acc: Tests, key: string, index: number): Tests =>
      R.assoc(
        key,
        constructTest(
          key,
          tests[key],
          tracks,
          createTestsOpts(def[key], index !== runTest),
        ),
        acc,
      ),
    {},
    R.keys(tests),
  )

// TODO: write tests
export const getNormalTests = (
  tests: TestsConfig = {},
  { tracks = {}, def = {} }: TestFromConfigOpts,
) =>
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

export const getRunnableTest = (
  tests: TestsConfig,
  userGroups: ?UserGroups,
  user: ?Object,
): TestsConfig => {
  if (!user || R.isEmpty(user)) {
    return tests
  }
  return R.pickBy(
    (test: TestConfig) => passTestUserGroups(test.userGroup, userGroups, user),
    tests,
  )
}

export const getTestsFromConfig = (
  allTests: TestsConfig = {},
  opts: TestFromConfigOpts,
) => {
  const { def, runTest, separate, userGroups, user } = opts

  const tests = getRunnableTest(allTests, userGroups, user)

  if (!def && separate) {
    return getSeparateTests(
      tests,
      R.assoc(
        'runTest',
        runTest ||
          Random.integer(0, R.length(R.keys(tests)) - 1)(
            Random.engines.nativeMath,
          ),
      ),
      opts,
    )
  }
  return getNormalTests(tests, opts)
}

// TODO: write tests
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
