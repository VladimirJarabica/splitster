"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupRule = undefined;

var _partial2 = require("ramda/src/partial");

var _partial3 = _interopRequireDefault(_partial2);

var _isEmpty2 = require("ramda/src/isEmpty");

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _allPass2 = require("ramda/src/allPass");

var _allPass3 = _interopRequireDefault(_allPass2);

var _anyPass2 = require("ramda/src/anyPass");

var _anyPass3 = _interopRequireDefault(_anyPass2);

var _keys2 = require("ramda/src/keys");

var _keys3 = _interopRequireDefault(_keys2);

var _prop2 = require("ramda/src/prop");

var _prop3 = _interopRequireDefault(_prop2);

var _contains2 = require("ramda/src/contains");

var _contains3 = _interopRequireDefault(_contains2);

var _map2 = require("ramda/src/map");

var _map3 = _interopRequireDefault(_map2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserGroupRule = exports.getUserGroupRule = function getUserGroupRule(userGroupSubConfig, exclude) {
  if (typeof userGroupSubConfig === "function") return userGroupSubConfig;
  // { key: "string", key: ["string", "string"]}
  var rules = (0, _map3.default)(function (key) {
    return function (user) {
      if (typeof userGroupSubConfig[key] === "function") return userGroupSubConfig[key](user);

      var allowedValues = Array.isArray(userGroupSubConfig[key]) ? userGroupSubConfig[key] : [userGroupSubConfig[key]];

      return (0, _contains3.default)((0, _prop3.default)(key, user), allowedValues);
    };
  }, (0, _keys3.default)(userGroupSubConfig));
  // TODO: test anypass
  return exclude ? (0, _anyPass3.default)(rules) : (0, _allPass3.default)(rules);
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
  if ((0, _isEmpty3.default)(userGroup)) return true;

  if (Array.isArray(userGroup)) {
    var checker = exclude ? _anyPass3.default : _allPass3.default;
    return checker((0, _map3.default)(function (_userGroup) {
      return (0, _partial3.default)(passTestUserGroups, [_userGroup]);
    }, userGroup))(user);
  }

  return getUserGroupRule(userGroup, exclude)(user);

  //   if (typeof testUserGroup === 'string') {
  //     return checkUserToUserGroup(user, userGroups[testUserGroup]);
  //   }

  // return checkUserToUserGroup(user, getUserGroup(userGroup));
};

exports.default = passTestUserGroups;