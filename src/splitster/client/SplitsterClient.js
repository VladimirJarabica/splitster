// @flow
import Cookies from "js-cookie"

import {
  parseCookies,
  parseTest,
  parseTests,
} from "../../tools/cookiesTools"
import * as SplitsterFn from "../../containers/SplitsterFn"

import type {
  Config,
  VariantConfig,
} from "../../types"
import type {
  Splitster,
} from "../../containers/SplitsterFn"
import type {
  Variants,
} from "../../containers/TestFn"


class SplitsterClient {
  state: Splitster

  constructor(config: Config, user: Object) {
    const def = parseCookies(Cookies.get())

    this.state = SplitsterFn.constructSplitster(config, user, def)
  }

  run = (testId: string): void => {
    this.state = SplitsterFn.run(this.state, testId)
    // TODO: Save to cookies
    const parsedTest = parseTest(this.state.tests[testId])
    console.log("parsedTest", parsedTest)
  }
  runAll = (): void => {
    this.state = SplitsterFn.runAll(this.state)
    // TODO: Save to cookies
    const parsedTests = parseTests(this.state.tests)
    console.log("parsedTests", parsedTests)
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
