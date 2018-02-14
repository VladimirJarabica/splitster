'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _allPass = require('ramda/src/allPass');

var _allPass2 = _interopRequireDefault(_allPass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkUserToUserGroup = function checkUserToUserGroup(user, userGroup) {
  return (0, _allPass2.default)(userGroup)(user);
};

exports.default = checkUserToUserGroup;