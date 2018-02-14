'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTestsFromConfig = exports.testDefProperlySet = exports.mergeDefaultTests = undefined;

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

var _mergeDeepRight = require('ramda/src/mergeDeepRight');

var _mergeDeepRight2 = _interopRequireDefault(_mergeDeepRight);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _getNormalTests = require('./getNormalTests');

var _getNormalTests2 = _interopRequireDefault(_getNormalTests);

var _disableByUsage = require('./disableByUsage');

var _disableByUsage2 = _interopRequireDefault(_disableByUsage);

var _disableBySeparateTests = require('./disableBySeparateTests');

var _disableBySeparateTests2 = _interopRequireDefault(_disableBySeparateTests);

var _disableByUserGroups = require('./disableByUserGroups');

var _disableByUserGroups2 = _interopRequireDefault(_disableByUserGroups);

var _disableByDeadline = require('./disableByDeadline');

var _disableByDeadline2 = _interopRequireDefault(_disableByDeadline);

var _disableByDef = require('./disableByDef');

var _disableByDef2 = _interopRequireDefault(_disableByDef);

var _disableByConfig = require('./disableByConfig');

var _disableByConfig2 = _interopRequireDefault(_disableByConfig);

var _defaultConfig = require('../defaultConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeDefaultTests = exports.mergeDefaultTests = function mergeDefaultTests(tests) {
  return (0, _map2.default)((0, _mergeDeepRight2.default)(_defaultConfig.defaultTestConfig), tests);
};

// If test is set to disabled config, it will consider as rewritable in cookies

var testDefProperlySet = exports.testDefProperlySet = function testDefProperlySet(testId, def) {
  return (0, _has2.default)(testId, def) && def[testId] !== '__disabled_config';
};

var getTestsFromConfig = exports.getTestsFromConfig = function getTestsFromConfig() {
  var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opts = arguments[1];

  // TODO: consider checking one by one
  // TODO: change from __disabled_config to another, if disabled in config has changed
  var def = opts.def,
      userGroups = opts.userGroups,
      user = opts.user;


  return (0, _compose2.default)((0, _getNormalTests2.default)(opts), // construct tests
  (0, _disableByUsage2.default)(def), // disable by usage
  (0, _disableBySeparateTests2.default)(opts, def), // disable by separate tests
  (0, _disableByUserGroups2.default)(userGroups, user, def), // disable by user group
  _disableByDeadline2.default, (0, _disableByDef2.default)(def), (0, _disableByConfig2.default)(def), // set disabled by default or config
  mergeDefaultTests)(tests);
};