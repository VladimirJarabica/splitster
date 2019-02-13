"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SplitsterServer = require("./SplitsterServer");

var _SplitsterServer2 = _interopRequireDefault(_SplitsterServer);

var _config = require("../../records/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(config, user, userId, override) {
  var validConfig = (0, _config.mergeDefaultConfig)(config);
  // TODO: in createValidConfig each test must me merged with test default config
  // also options should be merged
  return new _SplitsterServer2.default({ config: validConfig, user: user, userId: userId, override: override });
};

exports.default = init;