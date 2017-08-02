"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SplitsterServer = require("./SplitsterServer");

var _SplitsterServer2 = _interopRequireDefault(_SplitsterServer);

var _splitsterToolsFn = require("../../tools/splitsterToolsFn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitsterInit = function splitsterInit(config, user, def) {
  return new _SplitsterServer2.default((0, _splitsterToolsFn.mergeDefaultConfig)(config), user, def);
};

exports.default = splitsterInit;