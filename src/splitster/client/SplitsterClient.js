// @flow
import R from "ramda"
import jsCookies from "js-cookie"

import {
  parseCookies,
} from "../../tools/cookiesTools"
import * as SplitsterFn from "../../containers/SplitsterFn"
import { testsToSaveResults } from "../../tools/testToolsFn"

import type {
  Config,
  VariantConfig,
  SaveResults,
} from "../../types"
import type {
  Splitster,
} from "../../containers/SplitsterFn"
import type {
  Variants,
} from "../../containers/TestFn"

class SplitsterClient {
  state: Splitster

  constructor(config: Config, user: Object, def?: SaveResults) {
    const savedResults: SaveResults = def || parseCookies(jsCookies.get())
    this.state = SplitsterFn.constructSplitster(config, user, savedResults)
  }

  getSaveResults = (): SaveResults =>
    testsToSaveResults(this.state.tests)

  saveCookies = (saveResults: SaveResults): void => {
    R.forEach((key) => {
        jsCookies.set("splitster_" + key, saveResults[key])
      },
      R.keys(saveResults),
    )
  }

  run = (testId: string): void => {
    this.state = SplitsterFn.run(this.state, testId)

    const saveResults = testsToSaveResults([this.state.tests[testId]])
    this.saveCookies(saveResults)
  }

  runAll = (): void => {
    this.state = SplitsterFn.runAll(this.state)

    const saveResults = testsToSaveResults(this.state.tests)
    this.saveCookies(saveResults)
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
