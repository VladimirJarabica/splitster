'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupsFromConfig = exports.getTestsFromConfig = exports.getNormalTests = exports.disableByUsage = exports.disableBySeparateTests = exports.getSeparateRunTestId = exports.disableByUserGroups = exports.passTestUserGroups = exports.disableByDef = exports.checkDisabled = exports.disableByDeadline = exports.disableTestByDeadline = exports.disableByConfig = exports.disableByDev = exports.testDefProperlySet = exports.createTestsOpts = exports.mergeDefaultConfig = exports.mergeDefaultTests = undefined;

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _reduce = require('ramda/src/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _isNil = require('ramda/src/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _values = require('ramda/src/values');

var _values2 = _interopRequireDefault(_values);

var _filter = require('ramda/src/filter');

var _filter2 = _interopRequireDefault(_filter);

var _not = require('ramda/src/not');

var _not2 = _interopRequireDefault(_not);

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _allPass = require('ramda/src/allPass');

var _allPass2 = _interopRequireDefault(_allPass);

var _isEmpty = require('ramda/src/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _contains = require('ramda/src/contains');

var _contains2 = _interopRequireDefault(_contains);

var _match = require('ramda/src/match');

var _match2 = _interopRequireDefault(_match);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _mapObjIndexed = require('ramda/src/mapObjIndexed');

var _mapObjIndexed2 = _interopRequireDefault(_mapObjIndexed);

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

var _mergeDeepLeft = require('ramda/src/mergeDeepLeft');

var _mergeDeepLeft2 = _interopRequireDefault(_mergeDeepLeft);

var _mergeDeepRight = require('ramda/src/mergeDeepRight');

var _mergeDeepRight2 = _interopRequireDefault(_mergeDeepRight);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

// If test is set to disabled config, it will consider as rewritable in cookies
var testDefProperlySet = exports.testDefProperlySet = function testDefProperlySet(testId, def) {
  return (0, _has2.default)(testId, def) && def[testId] !== '__disabled_config';
};

/**
 * Permanently disable all tests, if '__disabled_dev' is present in def
 * TODO: document
 */
var disableByDev = exports.disableByDev = function disableByDev() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (tests) {
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if (def[testId] && def[testId] === '__disabled_dev') {
        return (0, _merge2.default)(test, {
          disabled: true,
          disabledReasom: 'dev'
        });
      }
      return test;
    }, tests);
  };
};

var disableByConfig = exports.disableByConfig = function disableByConfig() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (tests) {
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if (test.disabled) {
        return test;
      }
      if (def[testId] && def[testId] === '__disabled_config') {
        // Disabled by def
        if (!test.disabled) {
          // Not disabled by config => change
          return test;
        }
        if (test.disabled) {
          // Still disabled in config => set reason
          return (0, _merge2.default)(test, {
            disabled: true,
            disabledReason: 'config'
          });
        }
      }
      // Not disabled by def
      if (test.disabled) {
        // Disabled in config => set reason
        return (0, _merge2.default)(test, {
          disabled: true,
          disabledReason: 'config'
        });
      }
      // Not disabled at all
      return test;
    }, tests);
  };
};

var disableTestByDeadline = exports.disableTestByDeadline = function disableTestByDeadline(test) {
  if (test.disabled || !test.deadline) {
    return test;
  }
  if (new Date(test.deadline) < new Date()) {
    return (0, _compose2.default)((0, _assoc2.default)('disabledReason', 'deadline'), (0, _assoc2.default)('disabled', true))(test);
  }
  return test;
};

var disableByDeadline = exports.disableByDeadline = (0, _map2.default)(disableTestByDeadline);

var checkDisabled = exports.checkDisabled = function checkDisabled(def) {
  if (!def) {
    return {
      disabled: false,
      disabledReason: null
    };
  }

  var _R$match = (0, _match2.default)(/^(__disabled_)(\w+)$/, def),
      _R$match2 = _slicedToArray(_R$match, 3),
      _ = _R$match2[0],
      disabled = _R$match2[1],
      reason = _R$match2[2];

  var reasons = ['usage', 'separate_test', 'user_group'];

  if (Boolean(disabled) && (0, _contains2.default)(reason, reasons)) {
    return {
      disabled: true,
      disabledReason: reason
    };
  }
  return {
    disabled: false,
    disabledReason: null
  };
};

var disableByDef = exports.disableByDef = function disableByDef() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (tests) {
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if (test.disabled) {
        return test;
      }
      return (0, _merge2.default)(test, checkDisabled(def[testId]));
    })(tests);
  };
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
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (tests) {
    if (!user || (0, _isEmpty2.default)(user)) {
      return tests;
    }
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if (testDefProperlySet(testId, def) || test.disabled) {
        return test;
      }

      var disabledByUserGroups = (0, _not2.default)(passTestUserGroups(test.userGroup, userGroups || {}, user || {}));
      return (0, _compose2.default)((0, _assoc2.default)('disabledReason', disabledByUserGroups ? 'user_group' : null), (0, _assoc2.default)('disabled', disabledByUserGroups))(test);
    }, tests);
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
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function () {
    var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!separate) return tests;

    var separateRunTestId = getSeparateRunTestId(tests, runTest);

    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if (testDefProperlySet(testId, def) || test.disabled || testId === separateRunTestId) {
        return test;
      }
      return (0, _merge2.default)(test, {
        disabledReason: 'separate_test',
        disabled: true
      });
    }, tests);
  };
};

var disableByUsage = exports.disableByUsage = function disableByUsage() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (tests, testRandom) {
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if (testDefProperlySet(testId, def) || test.disabled || (0, _isNil2.default)(test.usage)) {
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

var getTestsFromConfig = exports.getTestsFromConfig = function getTestsFromConfig() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opts = arguments[1];

  // TODO: consider checking one by one
  // TODO: change from __disabled_config to another, if disabled in config has changed
  var def = opts.def,
      userGroups = opts.userGroups,
      user = opts.user;


  return (0, _compose2.default)(getNormalTests(opts), // construct tests
  disableByUsage(def), // disable by usage
  disableBySeparateTests(opts, def), // disable by separate tests
  disableByUserGroups(userGroups, user, def), // disable by user group
  disableByDeadline, disableByDef(def), disableByConfig(def), // set disabled by default or config
  disableByDev(def), mergeDefaultTests)(tests);
};

var getUserGroupsFromConfig = exports.getUserGroupsFromConfig = function getUserGroupsFromConfig() {
  var userGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _reduce2.default)(function (acc, key) {
    return (0, _assoc2.default)(key, (0, _UserGroup.constructUserGroup)(userGroups[key]), acc);
  }, {}, (0, _keys2.default)(userGroups));
};