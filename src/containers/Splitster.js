import R from "ramda"

import type {
  Config,
  OptionsConfig,
  TestConfig,
  VariantConfig,
  TrackConfig,
  UserGroupConfig,
  TracksConfig,
} from "../types"

import type { Cookies } from "../tools/cookiesTools"
import type { TestOptions } from "./Test"

import Test from "./Test"
import UserGroup from "./UserGroup"

import { parseCookies } from "../tools/cookiesTools"

type Tests = { [string]: Test }
type UserGroups = { [string]: UserGroup }

const createTestsOpts = (id: string, test: TestConfig, def: Cookies): TestOptions => {
  return {
    winningVariant: def[id],
  }
}

const reduceTestsFromConfig = (tests: { [string]: TestConfig } = {}, tracks: { [string]: TrackConfig }, def: Cookies) =>
  R.reduce(
    (acc: Tests, key: string): Tests =>
      R.assoc(key, new Test(key, tests[key], tracks, createTestsOpts(key, tests[key], def)), acc),
    {},
    R.keys(tests)
  )

const reduceUserGroupsFromConfig = (userGroups: { [string]: UserGroupConfig } = {}) => R.reduce(
  (acc: UserGroups, key: string): UserGroups => R.assoc(
    key,
    new UserGroup(userGroups[key]),
    acc
  ),
  {},
  R.keys(userGroups)
)

export default class Splitster {
  tests: Tests
  userGroups: UserGroups
  tracks: TracksConfig
  options: ?OptionsConfig
  user: Object|null

  // TODO: better solve options - separateTest etc
  constructor(config: Config, user?: Object = null, def?: Object = null) {
    this.tracks = config.tracks
    this.tests = reduceTestsFromConfig(config.tests, this.tracks, parseCookies(def, "test_"))
    this.userGroups = reduceUserGroupsFromConfig(config.userGroups)
    this.options = config.options
    this.user = user
  }

  run = (testId: string): void => {
    if (!this.tests[testId]) return

    this.tests[testId].run()
  }

  runAll = () => {
    R.forEach(this.run, R.keys(this.tests))
  }

  get = (testId: string): ?VariantConfig => {
    if (!this.tests[testId]) return null

    return this.tests[testId].get()
  }

  getAll = (): Array<VariantConfig> => {
    return R.map(this.get, R.keys(this.tests))
  }

  track = (testId: string): void => {
    if (!this.tests[testId]) return

    this.tests[testId].track()
  }

  trackAll = (): void => {
    R.forEach(this.track, R.keys(this.tests))
  }

  getSimpleState = () => {
    return R.reduce((acc, key: string) => {
      const test: Test = this.tests[key]
      if (!test.disabled) {
        return R.assoc(key, test.winningVariant.value, acc)
      }
      return acc
    }, {}, R.keys(this.tests))
  }
}