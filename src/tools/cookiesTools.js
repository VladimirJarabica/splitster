// @flow
import R from "ramda"

export type Cookies = { [string]: Object }

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
