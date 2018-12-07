'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browser = require('./clients/browser');

Object.defineProperty(exports, 'initSplitsterBrowser', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_browser).default;
  }
});

var _server = require('./clients/server');

Object.defineProperty(exports, 'initSplitsterServer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_server).default;
  }
});

var _cookies = require('./utils/cookies');

Object.defineProperty(exports, 'parseCookies', {
  enumerable: true,
  get: function get() {
    return _cookies.parseCookies;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }