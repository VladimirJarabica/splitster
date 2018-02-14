'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupsFromConfig = undefined;

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _reduce = require('ramda/src/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _UserGroup = require('../../containers/UserGroup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserGroupsFromConfig = exports.getUserGroupsFromConfig = function getUserGroupsFromConfig() {
  var userGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _reduce2.default)(function (acc, key) {
    return (0, _assoc2.default)(key, (0, _UserGroup.constructUserGroup)(userGroups[key]), acc);
  }, {}, (0, _keys2.default)(userGroups));
};