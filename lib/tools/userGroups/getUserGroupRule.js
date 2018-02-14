'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupRule = undefined;

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