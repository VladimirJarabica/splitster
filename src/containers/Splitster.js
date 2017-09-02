// @flow
import R from 'ramda'

import {
  getTestsFromConfig,
  getUserGroupsFromConfig,
} from '../tools/splitsterTools'

import type { Config, TracksConfig, OptionsConfig, SaveResults } from '../types'

import type { Tests, Variants, Variant } from './Test'
import * as TestFn from './Test'

import type { UserGroups } from './UserGroup'

export type Splitster = {|
  tests: Tests,
  userGroups: ?UserGroups,
  tracks: ?TracksConfig,
  options: ?OptionsConfig,
  user: ?Object,
|}

const defaultOptions: OptionsConfig = {
  separateTest: false,
  cookies: {
    disable: false,
    expiration: 30,
    name: 'splitster',
  },
}

export const constructSplitster = (
  config: Config,
  user?: ?Object = {},
  def?: SaveResults,
): Splitster => {
  const userGroups: UserGroups = getUserGroupsFromConfig(config.userGroups)
  const tests = getTestsFromConfig(config.tests, {
    tracks: config.tracks,
    def,
    separate: R.pathOr(false, ['options', 'separateTest'], config),
    user,
    userGroups,
  })

  return {
    tests,
    userGroups,
    tracks: config.tracks,
    options: R.mergeDeepLeft(config.options, defaultOptions),
    user,
  }
}

export const run = (splitster: Splitster, testId: string): Splitster =>
  R.assocPath(['tests', testId], TestFn.run(splitster.tests[testId]), splitster)

export const runAll = (splitster: Splitster): Splitster =>
  R.reduce(run, splitster, R.keys(splitster.tests))

export const willGet = (splitster: Splitster, testId: string): Splitster =>
  R.assocPath(
    ['tests', testId],
    TestFn.willGet(splitster.tests[testId]),
    splitster,
  )

export const get = (splitster: Splitster, testId: string): Variant =>
  TestFn.get(splitster.tests[testId])

// Custom set of variant (debug)
export const set = (
  splitster: Splitster,
  testId: string,
  variantId: string,
): Splitster =>
  R.assocPath(
    ['tests', testId],
    TestFn.set(splitster.tests[testId], variantId),
    splitster,
  )

export const willGetAll = (splitster: Splitster): Splitster =>
  R.reduce(willGet, splitster, R.keys(splitster.tests))

export const getAll = (splitster: Splitster): Variants =>
  R.reduce(
    (acc, key) => R.assoc(key, get(splitster, key), acc),
    {},
    R.keys(splitster.tests),
  )

export const track = (splitster: Splitster, testId: string): void =>
  TestFn.track(splitster.tests[testId])

export const trackAll = (splitster: Splitster): void =>
  R.forEach(R.partial(track, [splitster]), R.keys[splitster.tests])
