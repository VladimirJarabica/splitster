"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _client = require("./splitster/client");

Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_client).default;
  }
});

var _server = require("./splitster/server");

Object.defineProperty(exports, "server", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_server).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }