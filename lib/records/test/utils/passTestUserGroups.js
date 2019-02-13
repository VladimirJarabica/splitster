"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupRule = undefined;

var _partial = require("ramda/src/partial");

var _partial2 = _interopRequireDefault(_partial);

var _isEmpty = require("ramda/src/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _allPass = require("ramda/src/allPass");

var _allPass2 = _interopRequireDefault(_allPass);

var _anyPass = require("ramda/src/anyPass");

var _anyPass2 = _interopRequireDefault(_anyPass);

var _keys = require("ramda/src/keys");

var _keys2 = _interopRequireDefault(_keys);

var _prop = require("ramda/src/prop");

var _prop2 = _interopRequireDefault(_prop);

var _contains = require("ramda/src/contains");

var _contains2 = _interopRequireDefault(_contains);

var _map = require("ramda/src/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserGroupRule = exports.getUserGroupRule = function getUserGroupRule(userGroupSubConfig, exclude) {
  if (typeof userGroupSubConfig === "function") return userGroupSubConfig;
  // { key: "string", key: ["string", "string"]}
  var rules = (0, _map2.default)(function (key) {
    return function (user) {
      if (typeof userGroupSubConfig[key] === "function") return userGroupSubConfig[key](user);

      var allowedValues = Array.isArray(userGroupSubConfig[key]) ? userGroupSubConfig[key] : [userGroupSubConfig[key]];

      return (0, _contains2.default)((0, _prop2.default)(key, user), allowedValues);
    };
  }, (0, _keys2.default)(userGroupSubConfig));
  // TODO: test anypass
  return exclude ? (0, _anyPass2.default)(rules) : (0, _allPass2.default)(rules);
};

// export const getUserGroup = userGroupConfig => {
//   if (typeof userGroupConfig === 'function') {
//     return [userGroupConfig];
//   }

//   const userGroupSubConfigs = Array.isArray(userGroupConfig)
//     ? userGroupConfig
//     : [userGroupConfig];

//   return R.map(getUserGroupRule, userGroupSubConfigs);
// };

// export const checkUserToUserGroup = (user, userGroup) =>
//   R.allPass(userGroup)(user);

var passTestUserGroups = function passTestUserGroups(userGroup, user, exclude) {
  if ((0, _isEmpty2.default)(userGroup)) return true;

  if (Array.isArray(userGroup)) {
    var checker = exclude ? _anyPass2.default : _allPass2.default;
    return checker((0, _map2.default)(function (_userGroup) {
      return (0, _partial2.default)(passTestUserGroups, [_userGroup]);
    }, userGroup))(user);
  }

  return getUserGroupRule(userGroup, exclude)(user);

  //   if (typeof testUserGroup === 'string') {
  //     return checkUserToUserGroup(user, userGroups[testUserGroup]);
  //   }

  // return checkUserToUserGroup(user, getUserGroup(userGroup));
};

exports.default = passTestUserGroups;