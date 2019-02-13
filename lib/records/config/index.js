"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDefaultConfig = exports.mergeTestConfig = undefined;

var _map = require("ramda/src/map");

var _map2 = _interopRequireDefault(_map);

var _assoc = require("ramda/src/assoc");

var _assoc2 = _interopRequireDefault(_assoc);

var _compose = require("ramda/src/compose");

var _compose2 = _interopRequireDefault(_compose);

var _mergeDeepRight = require("ramda/src/mergeDeepRight");

var _mergeDeepRight2 = _interopRequireDefault(_mergeDeepRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
  tests: {},
  options: {
    cookies: {
      disabled: false,
      expiration: 30, // TODO: check if it is alright
      name: "splitster"
    }
  }
};

var defaultTestConfig = {
  description: "",
  userGroup: {},
  userGroupExclude: {},
  usage: 100,
  defaultVariant: "",
  variants: {},
  disabled: false,
  disabledReason: null,
  version: 0
};

var mergeTestConfig = exports.mergeTestConfig = (0, _mergeDeepRight2.default)(defaultTestConfig);

var mergeDefaultConfig = exports.mergeDefaultConfig = function mergeDefaultConfig(config) {
  var merged = (0, _compose2.default)(function (c) {
    return (0, _assoc2.default)("tests", (0, _map2.default)(mergeTestConfig, config.tests), c);
  }, (0, _mergeDeepRight2.default)(defaultConfig))(config);
  return merged;
};