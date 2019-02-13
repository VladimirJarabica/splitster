"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCookies = exports.filterCookiesByPrefix = undefined;

var _slice = require("ramda/src/slice");

var _slice2 = _interopRequireDefault(_slice);

var _assoc = require("ramda/src/assoc");

var _assoc2 = _interopRequireDefault(_assoc);

var _reduce = require("ramda/src/reduce");

var _reduce2 = _interopRequireDefault(_reduce);

var _keys = require("ramda/src/keys");

var _keys2 = _interopRequireDefault(_keys);

var _startsWith = require("ramda/src/startsWith");

var _startsWith2 = _interopRequireDefault(_startsWith);

var _filter = require("ramda/src/filter");

var _filter2 = _interopRequireDefault(_filter);

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
  return (0, _filter2.default)((0, _startsWith2.default)(prefix), (0, _keys2.default)(cookies));
};

/**
 * Parse cookies with keys {prefix_test_id} to {test_id}
 * @param prefix
 * @param cookies
 * @returns {*}
 */
var parseCookies = exports.parseCookies = function parseCookies(cookies) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "splitster_";
  return (0, _reduce2.default)(function (acc, key) {
    return (0, _assoc2.default)((0, _slice2.default)(prefix.length, key.length, key), cookies[key], acc);
  }, {}, filterCookiesByPrefix(cookies, prefix));
};