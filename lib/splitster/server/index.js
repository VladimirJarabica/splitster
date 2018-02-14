'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SplitsterServer = require('./SplitsterServer');

var _SplitsterServer2 = _interopRequireDefault(_SplitsterServer);

var _mergeDefaultConfig = require('../../tools/mergeDefaultConfig');

var _mergeDefaultConfig2 = _interopRequireDefault(_mergeDefaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitsterInit = function splitsterInit(config, user, def) {
  return new _SplitsterServer2.default((0, _mergeDefaultConfig2.default)(config), user, def);
};

exports.default = splitsterInit;