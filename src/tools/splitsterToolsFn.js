// @flow
import R from "ramda"

import type {
  TestConfig,
  TestsConfig,
  UserGroupsConfig,
  TracksConfig,
  SaveResults,
} from "../types"

import type { Tests, TestOptions } from "../containers/TestFn"
import { constructTest } from "../containers/TestFn"

import type { UserGroups } from "../containers/UserGroupFn"
import { constructUserGroup } from "../containers/UserGroupFn"

// TODO: write tests
export const createTestsOpts = (id: string, test: TestConfig, def: SaveResults): TestOptions => {
  return {
    winningVariant: def[id],
  }
}

// TODO: write tests
export const getTestsFromConfig = (tests: TestsConfig = {}, tracks: ?TracksConfig, def: SaveResults) =>
  R.reduce(
    (acc: Tests, key: string): Tests =>
      R.assoc(key, constructTest(key, tests[key], tracks, createTestsOpts(key, tests[key], def)), acc),
    {},
    R.keys(tests)
  )

// TODO: write tests
export const getUserGroupsFromConfig = (userGroups: UserGroupsConfig = {}): UserGroups =>
  R.reduce(
    (acc: UserGroups, key: string): UserGroups => R.assoc(
      key,
      constructUserGroup(userGroups[key]),
      acc
    ),
    {},
    R.keys(userGroups)
  )