"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupsFromConfig = exports.getTestsFromConfig = exports.createTestsOpts = undefined;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _TestFn = require("../containers/TestFn");

var _UserGroupFn = require("../containers/UserGroupFn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: write tests
var createTestsOpts = exports.createTestsOpts = function createTestsOpts(id, test, def) {
  return {
    winningVariant: def[id]
  };
};

// TODO: write tests

var getTestsFromConfig = exports.getTestsFromConfig = function getTestsFromConfig() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var tracks = arguments[1];
  var def = arguments[2];
  return _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, (0, _TestFn.constructTest)(key, tests[key], tracks, createTestsOpts(key, tests[key], def)), acc);
  }, {}, _ramda2.default.keys(tests));
};

// TODO: write tests
var getUserGroupsFromConfig = exports.getUserGroupsFromConfig = function getUserGroupsFromConfig() {
  var userGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, (0, _UserGroupFn.constructUserGroup)(userGroups[key]), acc);
  }, {}, _ramda2.default.keys(userGroups));
};