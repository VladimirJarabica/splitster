"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SplitsterClient = require("./SplitsterClient");

var _SplitsterClient2 = _interopRequireDefault(_SplitsterClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitsterInit = function splitsterInit(config, user, def) {
  return new _SplitsterClient2.default(config, user, def);
};
exports.default = splitsterInit;