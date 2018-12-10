'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// If test is set to disabled config (or wrong 'null'), it will consider as rewritable in cookies
var testOverridePersistance = function testOverridePersistance(testId, override) {
  return (0, _has2.default)(testId, override) && override[testId] !== '__disabled_config' && override[testId] !== '__disabled_null';
};

exports.default = testOverridePersistance;