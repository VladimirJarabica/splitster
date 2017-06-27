"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCookies = exports.filterCookiesByPrefix = undefined;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var filterCookiesByPrefix = exports.filterCookiesByPrefix = function filterCookiesByPrefix(cookies) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "splitster_";
  return _ramda2.default.filter(_ramda2.default.startsWith(prefix), _ramda2.default.keys(cookies));
};

/**
 * Parse cookies with keys {prefix_test_id} to {test_id}
 * @param prefix
 * @param cookies
 * @returns {*}
 */

var parseCookies = exports.parseCookies = function parseCookies(cookies) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "splitster_";
  return _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(_ramda2.default.slice(prefix.length, key.length, key), cookies[key], acc);
  }, {}, filterCookiesByPrefix(cookies, prefix));
};

// // TODO: write tests
// export const parseTest = (test: Test, prefix: string = "splitster_"): string =>
//   test.winningVariant ? test.winningVariant.id : ""

// export const parseTestIds = (testIds: Array<string>, splitster: Splitster, prefix: string = "splitster_"): Cookies =>
//   R.reduce(
//     (acc, testId) => R.assoc(`${prefix}test_${testId}`, parseTest(splitster.tests[testId]), acc),
//     {},
//     testIds,
//   )

// TODO: write tests
// TODO: unnecessary?
// export const parseTests = (tests: Tests, prefix: string = "splitster_"): Cookies =>
//   R.reduce(
//     (acc, key) => R.assoc(`${prefix}test_${key.id}`, parseTest(key), acc),
//     {},
//     R.values(tests),
//   )