"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDefaultConfig = exports.mergeTestConfig = exports.mapVariants = undefined;

var _map2 = require("ramda/src/map");

var _map3 = _interopRequireDefault(_map2);

var _mergeDeepRight2 = require("ramda/src/mergeDeepRight");

var _mergeDeepRight3 = _interopRequireDefault(_mergeDeepRight2);

var _assoc2 = require("ramda/src/assoc");

var _assoc3 = _interopRequireDefault(_assoc2);

var _compose2 = require("ramda/src/compose");

var _compose3 = _interopRequireDefault(_compose2);

var _is2 = require("ramda/src/is");

var _is3 = _interopRequireDefault(_is2);

var _mapObjIndexed2 = require("ramda/src/mapObjIndexed");

var _mapObjIndexed3 = _interopRequireDefault(_mapObjIndexed2);

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

var mapVariants = exports.mapVariants = (0, _mapObjIndexed3.default)(function (variant, key) {
  if ((0, _is3.default)(Number, variant)) {
    return {
      value: key,
      ratio: variant
    };
  }
  return variant;
});

var mergeTestConfig = exports.mergeTestConfig = (0, _compose3.default)(function (test) {
  return (0, _assoc3.default)("variants", mapVariants(test.variants), test);
}, (0, _mergeDeepRight3.default)(defaultTestConfig));

var mergeDefaultConfig = exports.mergeDefaultConfig = function mergeDefaultConfig(config) {
  var merged = (0, _compose3.default)(function (c) {
    return (0, _assoc3.default)("tests", (0, _map3.default)(mergeTestConfig, config.tests), c);
  }, (0, _mergeDeepRight3.default)(defaultConfig))(config);
  return merged;
};