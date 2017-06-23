// @flow
import R from "ramda"

import {
  getTestsFromConfig,
  getUserGroupsFromConfig,
} from "../tools/splitsterToolsFn"
import { parseCookies } from "../tools/cookiesTools"

import type {
  Config,
  VariantConfig,
  TracksConfig,
  OptionsConfig,
} from "../types"

import type { Tests } from "./TestFn"
import * as TestFn from "./TestFn"

import type { UserGroups } from "./UserGroupFn"
import type { Cookies } from "../tools/cookiesTools"


export type Splitster = {|
  tests: Tests,
  userGroups: ?UserGroups,
  tracks: ?TracksConfig,
  options: ?OptionsConfig,
  user: ?Object,
|}

export const constructSplitster = (config: Config, user?: Object = {}, def?: Cookies = {}): Splitster => {
  return {
    tests: getTestsFromConfig(config.tests, config.tracks, parseCookies(def, "test_")),
    userGroups: getUserGroupsFromConfig(config.userGroups),
    tracks: config.tracks,
    options: config.options,
    user,
  }
}

export const run = (splitster: Splitster, testId: string): Splitster =>
  R.assocPath(["tests", testId], TestFn.run(splitster.tests[testId]), splitster)

export const runAll = (splitster: Splitster): Splitster =>
  R.reduce(R.partial(run, [splitster]), splitster, R.keys(splitster.tests))

export const willGet = (splitster: Splitster, testId: string): Splitster =>
  R.assocPath(["tests", testId], TestFn.willGet(splitster.tests[testId]), splitster)

export const get = (splitster: Splitster, testId: string): VariantConfig =>
  TestFn.get(splitster.tests[testId])

export const willGetAll = (splitster: Splitster): Splitster =>
  R.reduce(R.partial(willGet, [splitster]), splitster, R.keys(splitster.tests))

export const getAll = (splitster: Splitster): Array<VariantConfig> =>
  R.map(R.partial(get, [splitster]), R.values(splitster.tests))

export const track = (splitster: Splitster, testId: string): void =>
  TestFn.track(splitster.tests[testId])

export const trackAll = (splitster: Splitster): void =>
  R.forEach(R.partial(track, [splitster]), R.keys[splitster.tests])