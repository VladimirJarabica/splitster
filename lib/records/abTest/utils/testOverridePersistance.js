"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has2 = require("ramda/src/has");

var _has3 = _interopRequireDefault(_has2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// If test is set to disabled config (or wrong 'null'), it will consider as rewritable in cookies
var testOverridePersistance = function testOverridePersistance(testId, override) {
  return (0, _has3.default)(testId, override) && override[testId] !== "__disabled_config" && override[testId] !== "__disabled_null";
};

exports.default = testOverridePersistance;