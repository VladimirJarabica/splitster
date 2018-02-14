'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSeparateRunTestId = undefined;

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _mapObjIndexed = require('ramda/src/mapObjIndexed');

var _mapObjIndexed2 = _interopRequireDefault(_mapObjIndexed);

var _values = require('ramda/src/values');

var _values2 = _interopRequireDefault(_values);

var _filter = require('ramda/src/filter');

var _filter2 = _interopRequireDefault(_filter);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _randomJs = require('random-js');

var _randomJs2 = _interopRequireDefault(_randomJs);

var _testsTools = require('./testsTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get id of test, which will be ran in separate mode.
 */
var getSeparateRunTestId = exports.getSeparateRunTestId = function getSeparateRunTestId(tests, runTest) {
  var enabledTestsIds = (0, _compose2.default)((0, _filter2.default)(Boolean), _values2.default, (0, _mapObjIndexed2.default)(function (test, key) {
    return test.disabled ? null : key;
  }))(tests);
  var runTestNumber = Number.isInteger(runTest) ? runTest : _randomJs2.default.integer(0, enabledTestsIds.length - 1)(_randomJs2.default.engines.nativeMath);
  return enabledTestsIds[runTestNumber];
};


var disableBySeparateTests = function disableBySeparateTests(_ref) {
  var runTest = _ref.runTest,
      _ref$separate = _ref.separate,
      separate = _ref$separate === undefined ? false : _ref$separate;
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function () {
    var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!separate) return tests;

    var separateRunTestId = getSeparateRunTestId(tests, runTest);

    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if ((0, _testsTools.testDefProperlySet)(testId, def) || test.disabled || testId === separateRunTestId) {
        return test;
      }
      return (0, _merge2.default)(test, {
        disabledReason: 'separate_test',
        disabled: true
      });
    }, tests);
  };
};

exports.default = disableBySeparateTests;