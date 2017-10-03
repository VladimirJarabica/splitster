'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupsFromConfig = exports.getTestsFromConfig = exports.disableByUsage = exports.disableByUserGroups = exports.passTestUserGroups = exports.setReasonIfDisabled = exports.getNormalTests = exports.disableBySeparateTests = exports.getSeparateRunTestId = exports.createTestsOpts = exports.mergeDefaultConfig = exports.mergeDefaultTests = undefined;

var _isNil = require('ramda/src/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _not = require('ramda/src/not');

var _not2 = _interopRequireDefault(_not);

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _allPass = require('ramda/src/allPass');

var _allPass2 = _interopRequireDefault(_allPass);

var _isEmpty = require('ramda/src/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _reduce = require('ramda/src/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _mapObjIndexed = require('ramda/src/mapObjIndexed');

var _mapObjIndexed2 = _interopRequireDefault(_mapObjIndexed);

var _values = require('ramda/src/values');

var _values2 = _interopRequireDefault(_values);

var _filter = require('ramda/src/filter');

var _filter2 = _interopRequireDefault(_filter);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _mergeDeepLeft = require('ramda/src/mergeDeepLeft');

var _mergeDeepLeft2 = _interopRequireDefault(_mergeDeepLeft);

var _mergeDeepRight = require('ramda/src/mergeDeepRight');

var _mergeDeepRight2 = _interopRequireDefault(_mergeDeepRight);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _randomJs = require('random-js');

var _randomJs2 = _interopRequireDefault(_randomJs);

var _defaultConfig = require('./defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _Test = require('../containers/Test');

var _UserGroup = require('../containers/UserGroup');

var _userGroupsTools = require('./userGroupsTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeDefaultTests = exports.mergeDefaultTests = function mergeDefaultTests(tests) {
  return (0, _map2.default)((0, _mergeDeepRight2.default)(_defaultConfig.defaultTestConfig), tests);
};

var mergeDefaultConfig = exports.mergeDefaultConfig = function mergeDefaultConfig(config) {
  return (0, _mergeDeepLeft2.default)(config, _defaultConfig2.default);
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
  var enabledTestsIds = (0, _compose2.default)((0, _filter2.default)(Boolean), _values2.default, (0, _mapObjIndexed2.default)(function (test, key) {
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

    return (0, _mapObjIndexed2.default)(function (test, key) {
      if (test.disabled || key === separateRunTestId) {
        return test;
      }
      return (0, _merge2.default)(test, {
        disabledReason: 'separate_test',
        disabled: true
      });
      // return R.assoc('disabled', key !== separateRunTestId, test),
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
    return (0, _reduce2.default)(function (acc, key) {
      return (0, _assoc2.default)(key, (0, _Test.constructTest)(key, tests[key], tracks, createTestsOpts(def[key])), acc);
    }, {}, (0, _keys2.default)(tests));
  };
};

var setReasonIfDisabled = exports.setReasonIfDisabled = function setReasonIfDisabled() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _map2.default)(function (test) {
    if (test.disabled) {
      console.log("disabled");
      return (0, _assoc2.default)('disabledReason', 'config', test);
    }
    return test;
  })(tests);
};

var passTestUserGroups = exports.passTestUserGroups = function passTestUserGroups() {
  var testUserGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var userGroups = arguments[1];
  var user = arguments[2];

  if ((0, _isEmpty2.default)(testUserGroup)) return true;

  if (Array.isArray(testUserGroup)) {
    return (0, _allPass2.default)((0, _map2.default)(function (_testUserGroup) {
      return (0, _partial2.default)(passTestUserGroups, [_testUserGroup, userGroups]);
    }, testUserGroup))(user);
  }

  if (typeof testUserGroup === 'string') {
    return (0, _userGroupsTools.checkUserToUserGroup)(user, userGroups[testUserGroup]);
  }

  return (0, _userGroupsTools.checkUserToUserGroup)(user, (0, _userGroupsTools.getUserGroup)(testUserGroup));
};

var disableByUserGroups = exports.disableByUserGroups = function disableByUserGroups(userGroups, user) {
  return function (tests) {
    if (!user || (0, _isEmpty2.default)(user)) {
      return tests;
    }
    return (0, _map2.default)(function (test) {
      if (test.disabled) {
        return test;
      }

      var disabledByUserGroups = (0, _not2.default)(passTestUserGroups(test.userGroup, userGroups || {}, user || {}));
      return (0, _compose2.default)((0, _assoc2.default)('disabledReason', disabledByUserGroups ? 'user_group' : null), (0, _assoc2.default)('disabled', disabledByUserGroups))(test);
    }, tests);
  };
};

var disableByUsage = exports.disableByUsage = function disableByUsage(tests, testRandom) {
  return (0, _map2.default)(function (test) {
    if (test.disabled || (0, _isNil2.default)(test.usage)) {
      return test;
    }
    var rand = testRandom || _randomJs2.default.integer(0, 99)(_randomJs2.default.engines.nativeMath);
    if (rand >= test.usage) {
      return (0, _merge2.default)(test, {
        disabled: true,
        disabledReason: 'usage'
      });
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

  if (def && !(0, _isEmpty2.default)(def)) {
    return getNormalTests(opts)(tests);
  }
  return (0, _compose2.default)(getNormalTests(opts), disableByUsage, disableBySeparateTests(opts), disableByUserGroups(userGroups, user), setReasonIfDisabled, mergeDefaultTests)(tests);
};

var getUserGroupsFromConfig = exports.getUserGroupsFromConfig = function getUserGroupsFromConfig() {
  var userGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _reduce2.default)(function (acc, key) {
    return (0, _assoc2.default)(key, (0, _UserGroup.constructUserGroup)(userGroups[key]), acc);
  }, {}, (0, _keys2.default)(userGroups));
};