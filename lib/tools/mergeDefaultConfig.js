'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mergeDeepLeft = require('ramda/src/mergeDeepLeft');

var _mergeDeepLeft2 = _interopRequireDefault(_mergeDeepLeft);

var _defaultConfig = require('./defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeDefaultConfig = function mergeDefaultConfig(config) {
  return (0, _mergeDeepLeft2.default)(config, _defaultConfig2.default);
};

exports.default = mergeDefaultConfig;