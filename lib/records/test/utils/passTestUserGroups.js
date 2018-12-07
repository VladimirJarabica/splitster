'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserToUserGroup = exports.getUserGroup = exports.getUserGroupRule = undefined;

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _isEmpty = require('ramda/src/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _allPass = require('ramda/src/allPass');

var _allPass2 = _interopRequireDefault(_allPass);

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _prop = require('ramda/src/prop');

var _prop2 = _interopRequireDefault(_prop);

var _contains = require('ramda/src/contains');

var _contains2 = _interopRequireDefault(_contains);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserGroupRule = exports.getUserGroupRule = function getUserGroupRule(userGroupSubConfig) {
  if (typeof userGroupSubConfig === 'function') return userGroupSubConfig;
  // { key: "string", key: ["string", "string"]}
  var rules = (0, _map2.default)(function (key) {
    return function (user) {
      var allowedValues = Array.isArray(userGroupSubConfig[key]) ? userGroupSubConfig[key] : [userGroupSubConfig[key]];

      return (0, _contains2.default)((0, _prop2.default)(key, user), allowedValues);
    };
  }, (0, _keys2.default)(userGroupSubConfig));
  return (0, _allPass2.default)(rules);
};

var getUserGroup = exports.getUserGroup = function getUserGroup(userGroupConfig) {
  if (typeof userGroupConfig === 'function') {
    return [userGroupConfig];
  }

  var userGroupSubConfigs = Array.isArray(userGroupConfig) ? userGroupConfig : [userGroupConfig];

  return (0, _map2.default)(getUserGroupRule, userGroupSubConfigs);
};

var checkUserToUserGroup = exports.checkUserToUserGroup = function checkUserToUserGroup(user, userGroup) {
  return (0, _allPass2.default)(userGroup)(user);
};

var passTestUserGroups = function passTestUserGroups(userGroup, user) {
  if ((0, _isEmpty2.default)(userGroup)) return true;

  if (Array.isArray(userGroup)) {
    return (0, _allPass2.default)((0, _map2.default)(function (_userGroup) {
      return (0, _partial2.default)(passTestUserGroups, [_userGroup]);
    }, userGroup))(user);
  }

  //   if (typeof testUserGroup === 'string') {
  //     return checkUserToUserGroup(user, userGroups[testUserGroup]);
  //   }

  return checkUserToUserGroup(user, getUserGroup(userGroup));
};

exports.default = passTestUserGroups;