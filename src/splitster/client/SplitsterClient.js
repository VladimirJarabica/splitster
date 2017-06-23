// @flow
import R from "ramda"
import jsCookies from "js-cookie"

import {
  parseCookies,
  parseTestIds,
} from "../../tools/cookiesTools"
import * as SplitsterFn from "../../containers/SplitsterFn"
import type { Cookies } from "../../tools/cookiesTools"

import type {
  Config,
  VariantConfig,
} from "../../types"
import type {
  Splitster,
} from "../../containers/SplitsterFn"
import type {
  Test,
  Variants,
} from "../../containers/TestFn"

// TODO: create SplitsterClientTools.js

const getTestsToCookies = (splitster: Splitster, testIds: Array<string>, cookies: Cookies): Array<Cookies> => {
  if (splitster.options.cookies.disable) {
    return []
  }
  return R.compose(
    (testIds) => parseTestIds(testIds, splitster),
    R.filter((testId) => !cookies[`test_${testId}`]),
  )(testIds)
}


class SplitsterClient {
  state: Splitster
  cookies: Cookies

  constructor(config: Config, user: Object) {
    this.cookies = parseCookies(jsCookies.get())
    this.state = SplitsterFn.constructSplitster(config, user, this.cookies)
  }

  saveCookies = (cookies: Cookies): void => {
    R.forEach((key) => {
      console.log("saving", key, cookies[key])
      jsCookies.set(key, cookies[key])
    }, R.keys(cookies))
  }

  run = (testId: string): void => {
    this.state = SplitsterFn.run(this.state, testId)

    const testsToCookies = getTestsToCookies(this.state, [testId], this.cookies)
    this.saveCookies(testsToCookies)
  }

  runAll = (): void => {
    this.state = SplitsterFn.runAll(this.state)

    const testsToCookies = getTestsToCookies(this.state, R.keys(this.state.tests), this.cookies)
    this.saveCookies(testsToCookies)
  }

  get = (testId: string): VariantConfig => {
    this.state = SplitsterFn.willGet(this.state, testId)
    return SplitsterFn.get(this.state, testId)
  }

  getAll = (): Variants => {
    this.state = SplitsterFn.willGetAll(this.state)
    return SplitsterFn.getAll(this.state)
  }

  track = (testId: string) => {
    SplitsterFn.track(this.state, testId)
  }

  trackAll = () => {
    SplitsterFn.trackAll(this.state)
  }
}

export default SplitsterClient
