'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isNil = require('ramda/src/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _mapObjIndexed = require('ramda/src/mapObjIndexed');

var _mapObjIndexed2 = _interopRequireDefault(_mapObjIndexed);

var _randomJs = require('random-js');

var _randomJs2 = _interopRequireDefault(_randomJs);

var _testsTools = require('./testsTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disableByUsage = function disableByUsage() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (tests, testRandom) {
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if ((0, _testsTools.testDefProperlySet)(testId, def) || test.disabled || (0, _isNil2.default)(test.usage)) {
        return test;
      }
      var rand = testRandom || _randomJs2.default.integer(0, 99)(_randomJs2.default.engines.nativeMath);
      if (rand >= test.usage) {
        return (0, _merge2.default)(test, {
          disabled: true,
          disabledReason: 'usage'
        });
      }
      return test;
    }, tests);
  };
};
exports.default = disableByUsage;