'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SplitsterServer = require('./SplitsterServer');

var _SplitsterServer2 = _interopRequireDefault(_SplitsterServer);

var _splitsterTools = require('../../tools/splitsterTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitsterInit = function splitsterInit(config, user, def) {
  var mergedConfig = (0, _splitsterTools.mergeDefaultConfig)(config);
  return new _SplitsterServer2.default(mergedConfig, user, (0, _splitsterTools.parseDef)(mergedConfig.tests, def));
};

exports.default = splitsterInit;