// @flow
import R from 'ramda'
import jsCookies from 'js-cookie'

import { parseCookies } from '../../tools/cookiesTools'
import * as SplitsterFn from '../../containers/Splitster'
import { testsToSaveResults } from '../../tools/testTools'
import { parseTestVersionKey } from '../../tools/splitsterTools'

import type { Config, SaveResults } from '../../types'
import type { Splitster } from '../../containers/Splitster'
import type { Variant, Variants } from '../../containers/Test'

class SplitsterClient {
  state: Splitster

  constructor(
    config: ?Config,
    user?: ?Object,
    def?: ?SaveResults,
    copy?: Splitster,
  ) {
    if (!config && !user && !def && copy) {
      this.state = copy
      return
    }
    const cookiesDisabled = R.pathOr(
      false,
      ['options', 'cookies', 'disabled'],
      config,
    )
    if (cookiesDisabled) {
      this.deleteCookies()
    }
    if (!cookiesDisabled && def) {
      // If there is default set (server side) try to save it to cookies
      this.saveCookies(def, config)
    }
    const savedResults: SaveResults =
      def || (cookiesDisabled ? {} : parseCookies(jsCookies.get()))
    // $FlowFixMe
    this.state = SplitsterFn.constructSplitster(config, user, savedResults)
  }

  getSaveResults = (includeVersion?: boolean = false): SaveResults =>
    testsToSaveResults(this.state.tests, includeVersion)

  saveCookies = (saveResults: SaveResults, customConfig: Config): void => {
    const config = this.state ? this.state.config : customConfig
    if (R.pathOr(false, ['options', 'cookies', 'disabled'], config)) {
      return
    }
    const options = R.mergeDeepLeft(
      R.propOr({}, 'options', config),
      SplitsterFn.defaultOptions,
    )
    const cookieKeys = R.keys(jsCookies.get())
    R.forEach(key => {
      const { testId, version } = parseTestVersionKey(key, config)
      const unversionedPrefix = `splitster_${testId}`
      const cookieKey = `${unversionedPrefix}_${version}`
      const cookieValue = jsCookies.get(cookieKey)

      // Get all cookies of this test except current version
      const testCookies = R.filter(
        testCookie =>
          testCookie !== cookieKey &&
          R.startsWith(unversionedPrefix, testCookie),
      )(cookieKeys)

      // Remove all cookies of test expect current version
      testCookies.forEach(testCookie => jsCookies.remove(testCookie))

      if (
        // Cookie is not set already
        !cookieValue ||
        // Rewrite wrong set cookie
        cookieValue === '__disabled_null' ||
        // Rewrite disabled by config
        (cookieValue === '__disabled_config' &&
          saveResults[key] !== '__disabled_config') ||
        // Rewrite to disabled by config
        (cookieValue !== '__disabled_config' &&
          saveResults[key] === '__disabled_config')
      ) {
        jsCookies.set(
          cookieKey,
          saveResults[key],
          R.pathOr(
            SplitsterFn.defaultOptions,
            ['cookies', 'cookiesOptions'],
            options,
          ),
        )
      }
    }, R.keys(saveResults))
  }

  deleteCookies = (): void =>
    R.compose(
      R.forEach(jsCookies.remove),
      R.filter(R.startsWith('splitster_')),
      R.map(R.head),
      R.map(R.split('=')),
      R.split('; '),
    )(document.cookie || '')

  run = (testId: string): void => {
    if (!SplitsterFn.hasTest(this.state, testId)) {
      return
    }
    this.state = SplitsterFn.run(this.state, testId)

    const saveResults = testsToSaveResults({
      testId: this.state.tests[testId],
    })
    this.saveCookies(saveResults)
  }

  runAll = (): void => {
    this.state = SplitsterFn.runAll(this.state)

    const saveResults = testsToSaveResults(this.state.tests)
    this.saveCookies(saveResults)
  }

  get = (testId: string): ?Variant => {
    if (!SplitsterFn.hasTest(this.state, testId)) {
      console.warn(
        `Splitster: Trying to access not existing test: ${testId}, your value will be null.`,
      )
      return {
        value: null,
      }
    }
    this.state = SplitsterFn.willGet(this.state, testId)
    return SplitsterFn.get(this.state, testId)
  };

  getAll = (): Variants => {
    this.state = SplitsterFn.willGetAll(this.state)
    return SplitsterFn.getAll(this.state)
  }

  set = (
    testId: string,
    variantId: string,
    cookies: Boolean,
  ): SplitsterClient => {
    if (!SplitsterFn.hasTest(this.state, testId)) {
      return this
    }
    if (cookies) {
      const cookieKey = `splitster_${testId}_${this.state.tests[testId]
        .version}`
      jsCookies.set(
        cookieKey,
        variantId,
        R.pathOr(
          SplitsterFn.defaultOptions,
          ['options', 'cookies', 'cookiesOptions'],
          this.state,
        ),
      )
    }
    return new SplitsterClient(
      null,
      null,
      null,
      SplitsterFn.set(this.state, testId, variantId),
    )
  };

  track = (testId: string) => {
    if (!SplitsterFn.hasTest(this.state, testId)) {
      return
    }
    SplitsterFn.track(this.state, testId)
  }

  trackAll = () => {
    SplitsterFn.trackAll(this.state)
  }
}

export default SplitsterClient
