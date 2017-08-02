"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupsFromConfig = exports.getNormalTests = exports.getSeparateTests = exports.getTestsFromConfig = exports.createTestsOpts = exports.mergeDefaultConfig = undefined;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _randomJs = require("random-js");

var _randomJs2 = _interopRequireDefault(_randomJs);

var _defaultConfig = require("./defaultConfig");

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _TestFn = require("../containers/TestFn");

var _UserGroupFn = require("../containers/UserGroupFn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeDefaultConfig = exports.mergeDefaultConfig = function mergeDefaultConfig(config) {
  return _ramda2.default.mergeDeepLeft(config, _defaultConfig2.default);
};
var createTestsOpts = exports.createTestsOpts = function createTestsOpts() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return {
    disabled: disabled,
    winningVariant: disabled ? "__disabled" : def
  };
};

var getTestsFromConfig = exports.getTestsFromConfig = function getTestsFromConfig() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opts = arguments[1];
  var def = opts.def,
      runTest = opts.runTest,
      separate = opts.separate;

  if (!def && separate) {
    return getSeparateTests(tests, _ramda2.default.assoc("runTest", runTest || _randomJs2.default.integer(0, _ramda2.default.length(_ramda2.default.keys(tests)) - 1)(_randomJs2.default.engines.nativeMath)), opts);
  }
  return getNormalTests(tests, opts);
};

// TODO: write tests
var getSeparateTests = exports.getSeparateTests = function getSeparateTests() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var _ref$runTest = _ref.runTest,
      runTest = _ref$runTest === undefined ? 0 : _ref$runTest,
      _ref$def = _ref.def,
      def = _ref$def === undefined ? {} : _ref$def,
      _ref$tracks = _ref.tracks,
      tracks = _ref$tracks === undefined ? {} : _ref$tracks;

  return _ramda2.default.addIndex(_ramda2.default.reduce)(function (acc, key, index) {
    return _ramda2.default.assoc(key, (0, _TestFn.constructTest)(key, tests[key], tracks, createTestsOpts(def[key], index !== runTest)), acc);
  }, {}, _ramda2.default.keys(tests));
};

// TODO: write tests
var getNormalTests = exports.getNormalTests = function getNormalTests() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref2 = arguments[1];
  var _ref2$tracks = _ref2.tracks,
      tracks = _ref2$tracks === undefined ? {} : _ref2$tracks,
      _ref2$def = _ref2.def,
      def = _ref2$def === undefined ? {} : _ref2$def;

  console.log("getNormalTests", tests);
  console.log("getNormalTests def", def);
  return _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, (0, _TestFn.constructTest)(key, tests[key], tracks, createTestsOpts(def[key])), acc);
  }, {}, _ramda2.default.keys(tests));
};

// TODO: write tests
var getUserGroupsFromConfig = exports.getUserGroupsFromConfig = function getUserGroupsFromConfig() {
  var userGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, (0, _UserGroupFn.constructUserGroup)(userGroups[key]), acc);
  }, {}, _ramda2.default.keys(userGroups));
};