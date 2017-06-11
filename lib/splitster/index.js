"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Splitster = require("../containers/Splitster");

var _Splitster2 = _interopRequireDefault(_Splitster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitsterInit = function splitsterInit(config) {
  return new _Splitster2.default(config);
};

exports.default = splitsterInit;