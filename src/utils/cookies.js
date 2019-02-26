import R from "ramda";

/**
 * How cookies will be set
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
export const filterCookiesByPrefix = (cookies, prefix = "splitster_") =>
  R.filter(R.startsWith(prefix), R.keys(cookies));

/**
 * Parse cookies with keys {prefix_test_id} to {test_id}
 * @param prefix
 * @param cookies
 * @returns {*}
 */
export const parseCookies = (cookies, prefix = "splitster_") =>
  R.reduce(
    (acc, key) =>
      R.assoc(R.slice(prefix.length, key.length, key), cookies[key], acc),
    {},
    filterCookiesByPrefix(cookies, prefix)
  );
