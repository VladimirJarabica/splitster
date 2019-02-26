"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./clients/index");

Object.defineProperty(exports, "init", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _cookies = require("./utils/cookies");

Object.defineProperty(exports, "parseCookies", {
  enumerable: true,
  get: function get() {
    return _cookies.parseCookies;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }