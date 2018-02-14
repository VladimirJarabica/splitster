'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructUserGroup = undefined;

var _getUserGroup = require('../tools/userGroups/getUserGroup');

var _getUserGroup2 = _interopRequireDefault(_getUserGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: do UserGroup
var constructUserGroup = exports.constructUserGroup = function constructUserGroup(userGroupConfig) {
  return (0, _getUserGroup2.default)(userGroupConfig);
};