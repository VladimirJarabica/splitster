// @flow
import R from 'ramda'
import jsCookies from 'js-cookie'

import { parseCookies } from '../../tools/cookiesTools'
import * as SplitsterFn from '../../containers/SplitsterFn'
import { testsToSaveResults } from '../../tools/testToolsFn'

import type { Config, SaveResults } from '../../types'
import type { Splitster } from '../../containers/SplitsterFn'
import type { Variant, Variants } from '../../containers/TestFn'

class SplitsterClient {
  state: Splitster

  constructor(
    config: ?Config,
    user?: ?Object,
    def?: SaveResults,
    copy?: Splitster,
  ) {
    if (!config && !user && !def && copy) {
      this.state = copy
      return
    }
    const cookiesDisabled = config.options.cookies.disable
    if (!cookiesDisabled && def) {
      // If there is default set (server side) try to save it to cookies
      this.saveCookies(def)
    }
    const savedResults: SaveResults =
      def || (cookiesDisabled ? {} : parseCookies(jsCookies.get()))
    this.state = SplitsterFn.constructSplitster(config, user, savedResults)
  }

  getSaveResults = (): SaveResults => testsToSaveResults(this.state.tests)

  saveCookies = (saveResults: SaveResults): void => {
    R.forEach(key => {
      const cookieKey = `splitster_${key}`
      if (!jsCookies.get(cookieKey)) {
        // Only save cookie if it is not saved already
        jsCookies.set(cookieKey, saveResults[key])
      }
    }, R.keys(saveResults))
  }

  run = (testId: string): void => {
    this.state = SplitsterFn.run(this.state, testId)

    const saveResults = testsToSaveResults({ testId: this.state.tests[testId] })
    this.saveCookies(saveResults)
  }

  runAll = (): void => {
    this.state = SplitsterFn.runAll(this.state)

    const saveResults = testsToSaveResults(this.state.tests)
    this.saveCookies(saveResults)
  }

  get = (testId: string): Variant => {
    this.state = SplitsterFn.willGet(this.state, testId)
    return SplitsterFn.get(this.state, testId)
  };

  getAll = (): Variants => {
    this.state = SplitsterFn.willGetAll(this.state)
    return SplitsterFn.getAll(this.state)
  }

  set = (testId: string, variantId: string): void =>
    new SplitsterClient(
      null,
      null,
      null,
      SplitsterFn.set(this.state, testId, variantId),
    );

  track = (testId: string) => {
    SplitsterFn.track(this.state, testId)
  }

  trackAll = () => {
    SplitsterFn.trackAll(this.state)
  }
}

export default SplitsterClient
