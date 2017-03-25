"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Test = undefined;

var _Test = require("./Test");

Object.defineProperty(exports, "Test", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Test).default;
  }
});

var _splitster = require("./splitster");

var splitster = _interopRequireWildcard(_splitster);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = splitster;