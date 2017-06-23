// @flow
import R from "ramda"

import type {
  TestConfig,
  TestsConfig,
  UserGroupsConfig,
  TracksConfig,
} from "../types"
import type { Cookies } from "./cookiesTools"

import type { Tests, TestOptions } from "../containers/TestFn"
import { constructTest } from "../containers/TestFn"

import type { UserGroups } from "../containers/UserGroupFn"
import { constructUserGroup } from "../containers/UserGroupFn"

export const createTestsOpts = (id: string, test: TestConfig, def: Cookies): TestOptions => {
  return {
    winningVariant: def[id],
  }
}

export const getTestsFromConfig = (tests: TestsConfig = {}, tracks: ?TracksConfig, def: Cookies) =>
  R.reduce(
    (acc: Tests, key: string): Tests =>
      R.assoc(key, constructTest(key, tests[key], tracks, createTestsOpts(key, tests[key], def)), acc),
    {},
    R.keys(tests)
  )

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