'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _getUserGroupRule = require('./getUserGroupRule');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserGroup = function getUserGroup(userGroupConfig) {
  if (typeof userGroupConfig === 'function') {
    return [userGroupConfig];
  }

  var userGroupSubConfigs = Array.isArray(userGroupConfig) ? userGroupConfig : [userGroupConfig];

  return (0, _map2.default)(_getUserGroupRule.getUserGroupRule, userGroupSubConfigs);
};

exports.default = getUserGroup;