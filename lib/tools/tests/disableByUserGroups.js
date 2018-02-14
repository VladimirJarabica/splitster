'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passTestUserGroups = undefined;

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _not = require('ramda/src/not');

var _not2 = _interopRequireDefault(_not);

var _mapObjIndexed = require('ramda/src/mapObjIndexed');

var _mapObjIndexed2 = _interopRequireDefault(_mapObjIndexed);

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _allPass = require('ramda/src/allPass');

var _allPass2 = _interopRequireDefault(_allPass);

var _isEmpty = require('ramda/src/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _testsTools = require('./testsTools');

var _getUserGroup = require('../userGroups/getUserGroup');

var _getUserGroup2 = _interopRequireDefault(_getUserGroup);

var _checkUserToUserGroup = require('../userGroups/checkUserToUserGroup');

var _checkUserToUserGroup2 = _interopRequireDefault(_checkUserToUserGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return (0, _checkUserToUserGroup2.default)(user, userGroups[testUserGroup]);
  }

  return (0, _checkUserToUserGroup2.default)(user, (0, _getUserGroup2.default)(testUserGroup));
};

var disableByUserGroups = function disableByUserGroups(userGroups, user) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (tests) {
    if (!user || (0, _isEmpty2.default)(user)) {
      return tests;
    }
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if ((0, _testsTools.testDefProperlySet)(testId, def) || test.disabled) {
        return test;
      }

      var disabledByUserGroups = (0, _not2.default)(passTestUserGroups(test.userGroup, userGroups || {}, user || {}));
      return (0, _compose2.default)((0, _assoc2.default)('disabledReason', disabledByUserGroups ? 'user_group' : null), (0, _assoc2.default)('disabled', disabledByUserGroups))(test);
    }, tests);
  };
};

exports.default = disableByUserGroups;