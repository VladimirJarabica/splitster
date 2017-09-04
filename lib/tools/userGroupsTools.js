'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserToUserGroup = exports.getUserGroup = exports.getUserGroupRule = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserGroupRule = exports.getUserGroupRule = function getUserGroupRule(userGroupSubConfig) {
  if (typeof userGroupSubConfig === 'function') return userGroupSubConfig;
  // { key: "string", key: ["string", "string"]}
  var rules = _ramda2.default.map(function (key) {
    return function (user) {
      var allowedValues = Array.isArray(userGroupSubConfig[key]) ? userGroupSubConfig[key] : [userGroupSubConfig[key]];

      return _ramda2.default.contains(_ramda2.default.prop(key, user), allowedValues);
    };
  }, _ramda2.default.keys(userGroupSubConfig));
  return _ramda2.default.allPass(rules);
};
var getUserGroup = exports.getUserGroup = function getUserGroup(userGroupConfig) {
  if (typeof userGroupConfig === 'function') {
    return [userGroupConfig];
  }

  var userGroupSubConfigs = Array.isArray(userGroupConfig) ? userGroupConfig : [userGroupConfig];

  return _ramda2.default.map(getUserGroupRule, userGroupSubConfigs);
};

var checkUserToUserGroup = exports.checkUserToUserGroup = function checkUserToUserGroup(user, userGroup) {
  return _ramda2.default.allPass(userGroup)(user);
};