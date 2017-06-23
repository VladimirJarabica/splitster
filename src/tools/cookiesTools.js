// @flow
import R from "ramda"

import type { Test, Tests } from "../containers/TestFn"

export type Cookies = { [string]: string }

/**
 * How cookies will set
 *
 * Tests:
 * {prefix}_{test}_{test-id}={winning_variant_id}
 * splitster_test_button_color=red
 * splitster_test_show_widget=show
 *
 * Variants will be in config,
 * tracks will be in config
 * ... so basically tests are enough for now
 */

export const filterCookiesByPrefix = (cookies: Cookies, prefix: string = "splitster_"): Array<string> =>
  R.filter(R.startsWith(prefix), R.keys(cookies))

/**
 * Parse cookies with keys {prefix_test_id} to {test_id}
 * @param prefix
 * @param cookies
 * @returns {*}
 */
export const parseCookies = (cookies: Cookies, prefix: string = "splitster_"): Cookies =>
  R.reduce(
    (acc, key) => R.assoc(R.slice(prefix.length , key.length, key), cookies[key], acc),
    {},
    filterCookiesByPrefix(cookies, prefix),
  )

// TODO: write tests
export const parseTest = (test: Test, prefix: string = "splitster_"): string =>
  test.winningVariant ? test.winningVariant.value : ""

// TODO: write tests
export const parseTests = (tests: Tests, prefix: string = "splitster_"): Cookies =>
  R.reduce(
    (acc, key) => R.assoc(prefix + key.id, parseTest(key), acc),
    {},
    tests,
  )