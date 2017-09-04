'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SplitsterClient = require('./SplitsterClient');

var _SplitsterClient2 = _interopRequireDefault(_SplitsterClient);

var _splitsterTools = require('../../tools/splitsterTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitsterInit = function splitsterInit(config, user, def) {
  return new _SplitsterClient2.default((0, _splitsterTools.mergeDefaultConfig)(config), user, def);
};

exports.default = splitsterInit;