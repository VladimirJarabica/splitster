'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupsFromConfig = exports.getTestsFromConfig = exports.disableByUsage = exports.disableByUserGroups = exports.passTestUserGroups = exports.getNormalTests = exports.disableBySeparateTests = exports.getSeparateRunTestId = exports.createTestsOpts = exports.mergeDefaultConfig = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _randomJs = require('random-js');

var _randomJs2 = _interopRequireDefault(_randomJs);

var _defaultConfig = require('./defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _Test = require('../containers/Test');

var _UserGroup = require('../containers/UserGroup');

var _userGroupsTools = require('./userGroupsTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeDefaultConfig = exports.mergeDefaultConfig = function mergeDefaultConfig(config) {
  return _ramda2.default.mergeDeepLeft(config, _defaultConfig2.default);
};

var createTestsOpts = exports.createTestsOpts = function createTestsOpts(def) {
  return {
    winningVariant: def || null
  };
};

/**
 * Get id of test, which will be ran in separate mode.
 */
var getSeparateRunTestId = exports.getSeparateRunTestId = function getSeparateRunTestId(tests, runTest) {
  var enabledTestsIds = _ramda2.default.compose(_ramda2.default.filter(Boolean), _ramda2.default.values, _ramda2.default.mapObjIndexed(function (test, key) {
    return test.disabled ? null : key;
  }))(tests);
  var runTestNumber = Number.isInteger(runTest) ? runTest : _randomJs2.default.integer(0, enabledTestsIds.length - 1)(_randomJs2.default.engines.nativeMath);
  return enabledTestsIds[runTestNumber];
};

var disableBySeparateTests = exports.disableBySeparateTests = function disableBySeparateTests(_ref) {
  var runTest = _ref.runTest,
      _ref$separate = _ref.separate,
      separate = _ref$separate === undefined ? false : _ref$separate;
  return function () {
    var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!separate) return tests;

    var separateRunTestId = getSeparateRunTestId(tests, runTest);

    return _ramda2.default.mapObjIndexed(function (test, key) {
      return _ramda2.default.assoc('disabled', key !== separateRunTestId, test);
    }, tests);
  };
};

// TODO: write tests
var getNormalTests = exports.getNormalTests = function getNormalTests(_ref2) {
  var _ref2$tracks = _ref2.tracks,
      tracks = _ref2$tracks === undefined ? {} : _ref2$tracks,
      _ref2$def = _ref2.def,
      def = _ref2$def === undefined ? {} : _ref2$def;
  return function () {
    var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _ramda2.default.reduce(function (acc, key) {
      return _ramda2.default.assoc(key, (0, _Test.constructTest)(key, tests[key], tracks, createTestsOpts(def[key])), acc);
    }, {}, _ramda2.default.keys(tests));
  };
};

var passTestUserGroups = exports.passTestUserGroups = function passTestUserGroups() {
  var testUserGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var userGroups = arguments[1];
  var user = arguments[2];

  if (_ramda2.default.isEmpty(testUserGroup)) return true;

  if (Array.isArray(testUserGroup)) {
    return _ramda2.default.allPass(_ramda2.default.map(function (_testUserGroup) {
      return _ramda2.default.partial(passTestUserGroups, [_testUserGroup, userGroups]);
    }, testUserGroup))(user);
  }

  if (typeof testUserGroup === 'string') {
    return (0, _userGroupsTools.checkUserToUserGroup)(user, userGroups[testUserGroup]);
  }

  return (0, _userGroupsTools.checkUserToUserGroup)(user, (0, _userGroupsTools.getUserGroup)(testUserGroup));
};

var disableByUserGroups = exports.disableByUserGroups = function disableByUserGroups(userGroups, user) {
  return function (tests) {
    if (!user || _ramda2.default.isEmpty(user)) {
      return tests;
    }
    return _ramda2.default.map(function (test) {
      return _ramda2.default.assoc('disabled', test.disabled || _ramda2.default.not(passTestUserGroups(test.userGroup, userGroups || {}, user || {})), test);
    }, tests);
  };
};

var disableByUsage = exports.disableByUsage = function disableByUsage(tests, testRandom) {
  return _ramda2.default.map(function (test) {
    if (!test.disabled && test.usage) {
      var rand = testRandom || _randomJs2.default.integer(0, 99)(_randomJs2.default.engines.nativeMath);
      if (rand >= test.usage) {
        return _ramda2.default.assoc('disabled', true, test);
      }
    }
    return test;
  }, tests);
};

var getTestsFromConfig = exports.getTestsFromConfig = function getTestsFromConfig() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opts = arguments[1];
  var def = opts.def,
      userGroups = opts.userGroups,
      user = opts.user;


  if (def && !_ramda2.default.isEmpty(def)) {
    return getNormalTests(opts)(tests);
  }

  return _ramda2.default.compose(getNormalTests(opts), disableByUsage, disableBySeparateTests(opts), disableByUserGroups(userGroups, user))(tests);
};

var getUserGroupsFromConfig = exports.getUserGroupsFromConfig = function getUserGroupsFromConfig() {
  var userGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, (0, _UserGroup.constructUserGroup)(userGroups[key]), acc);
  }, {}, _ramda2.default.keys(userGroups));
};