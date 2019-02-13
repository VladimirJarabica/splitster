"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCookies = exports.filterCookiesByPrefix = undefined;

var _slice2 = require("ramda/src/slice");

var _slice3 = _interopRequireDefault(_slice2);

var _assoc2 = require("ramda/src/assoc");

var _assoc3 = _interopRequireDefault(_assoc2);

var _reduce2 = require("ramda/src/reduce");

var _reduce3 = _interopRequireDefault(_reduce2);

var _keys2 = require("ramda/src/keys");

var _keys3 = _interopRequireDefault(_keys2);

var _startsWith2 = require("ramda/src/startsWith");

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _filter2 = require("ramda/src/filter");

var _filter3 = _interopRequireDefault(_filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var filterCookiesByPrefix = exports.filterCookiesByPrefix = function filterCookiesByPrefix(cookies) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "splitster_";
  return (0, _filter3.default)((0, _startsWith3.default)(prefix), (0, _keys3.default)(cookies));
};

/**
 * Parse cookies with keys {prefix_test_id} to {test_id}
 * @param prefix
 * @param cookies
 * @returns {*}
 */
var parseCookies = exports.parseCookies = function parseCookies(cookies) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "splitster_";
  return (0, _reduce3.default)(function (acc, key) {
    return (0, _assoc3.default)((0, _slice3.default)(prefix.length, key.length, key), cookies[key], acc);
  }, {}, filterCookiesByPrefix(cookies, prefix));
};