import * as R from "ramda"

import { getTestsFromConfig } from "../records/test"
import { mergeDefaultConfig } from "../records/config"
import jsCookies from "js-cookie"

/**
 * Splitster client class abstraction
 * containing all the common methods
 */
export class SplitsterClient {
  // Config
  tests = {}
  options = {}

  // Live data
  user = ""
  userId = ""

  constructor({ config, user, userId, override = {} }, copy) {
    if (!config && !user && !userId && copy) {
      // Create new one from copy
      this.tests = copy.tests
      this.options = copy.options
      this.user = copy.user
      this.results = copy.results
      return
    }

    try {
      if (
        !this.options.cookies.disabled &&
        !jsCookies.get("user_id_splitster")
      ) {
        // Save user_id to cookies
        jsCookies.set("user_id_splitster", this.userId)
      }
    } catch (err) {}

    // Initialize splitster

    // Set user
    this.user = user
    this.userId = userId
    // Set options
    this.options = config.options

    this.tests = getTestsFromConfig(config.tests, { override, user, userId })
  }

  getSaveResults = (includeVersions? = false, noDisabled? = false) =>
    R.compose(
      R.fromPairs,
      R.map(([testId, test]) => {
        const winning = test.disabled
          ? noDisabled
            ? test.defaultVariant
            : `__disabled_${test.disabledReason}`
          : test.winningVariant
        return [includeVersions ? `${testId}_${test.version}` : testId, winning]
      }),
      R.toPairs
    )(this.tests)

  get = testId => {
    if (!R.has(testId, this.tests)) {
      console.warn(
        `Splitster: Trying to access not existing test: ${testId}, your value will be null.`
      )
      return { value: null }
    }
    return { value: this.tests[testId].winningVariant }
  }

  set = (testId, variantId, cookie = false) => {
    try {
      if (cookie) {
        // Dev only for replacing also cookie.
        // You need to handle parsing by yourself in `override` object
        const cookieKey = `splitster_${testId}_${this.tests[testId].version}`
        jsCookies.set(cookieKey, variantId)
      }
    } catch (err) {}

    return new SplitsterClient(
      {},
      {
        options: this.options,
        user: this.user,
        tests: R.assocPath([testId, "winningVariant"], variantId, this.tests)
      }
    )
  }
}

const init = (config, user, userId, override) => {
  const validConfig = mergeDefaultConfig(config)
  // TODO: in createValidConfig each test must me merged with test default config
  // also options should be merged
  return new SplitsterClient({ config: validConfig, user, userId, override })
}

export default init
