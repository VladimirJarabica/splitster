// @flow
import R from "ramda"
import Random from "random-js"

import type {
  Config,
  TestsConfig,
  UserGroupsConfig,
  TracksConfig,
  SaveResults,
} from "../types"

import defaultConfig from "./defaultConfig"

import type { Tests, TestOptions } from "../containers/TestFn"
import { constructTest } from "../containers/TestFn"

import type { UserGroups } from "../containers/UserGroupFn"
import { constructUserGroup } from "../containers/UserGroupFn"

export const mergeDefaultConfig = (config: Config): Config => {
  return R.mergeDeepLeft(config, defaultConfig)
}

export const createTestsOpts = (def: string = null, disabled: boolean = false): TestOptions => {
  return {
    disabled,
    winningVariant: disabled ? "__disabled" : def,
  }
}

export type TestFromConfigOpts = {
  tracks?: TracksConfig,
  def?: SaveResults,
  separate?: boolean,
  runTest?: number,
}
export const getTestsFromConfig = (tests: TestsConfig = {}, opts: TestFromConfigOpts) => {
  const { def, runTest, separate } = opts
  if (!def && separate) {
    return getSeparateTests(
      tests,
      R.assoc("runTest", runTest || Random.integer(0, R.length(R.keys(tests)) - 1)(Random.engines.nativeMath)),
      opts,
    )
  }
  return getNormalTests(tests, opts)
}

// TODO: write tests
export const getSeparateTests = (tests: TestsConfig = {}, { runTest = 0, def = {}, tracks = {} }: TestFromConfigOpts) => {
  return R.addIndex(R.reduce)(
    (acc: Tests, key: string, index: number): Tests =>
      R.assoc(key, constructTest(key, tests[key], tracks, createTestsOpts(def[key], index !== runTest)), acc),
    {},
    R.keys(tests)
  )
}

// TODO: write tests
export const getNormalTests = (tests: TestsConfig = {}, { tracks = {}, def = {} }: TestFromConfigOpts) => {
  return R.reduce(
    (acc: Tests, key: string): Tests =>
      R.assoc(key, constructTest(key, tests[key], tracks, createTestsOpts(def[key])), acc),
    {},
    R.keys(tests)
  )
}

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