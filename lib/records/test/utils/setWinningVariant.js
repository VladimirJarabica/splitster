"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWinningVariant = undefined;

var _toPairs2 = require("ramda/src/toPairs");

var _toPairs3 = _interopRequireDefault(_toPairs2);

var _isNil2 = require("ramda/src/isNil");

var _isNil3 = _interopRequireDefault(_isNil2);

var _assoc2 = require("ramda/src/assoc");

var _assoc3 = _interopRequireDefault(_assoc2);

var _find2 = require("ramda/src/find");

var _find3 = _interopRequireDefault(_find2);

var _map2 = require("ramda/src/map");

var _map3 = _interopRequireDefault(_map2);

var _sum2 = require("ramda/src/sum");

var _sum3 = _interopRequireDefault(_sum2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _seedrandom = require("seedrandom");

var _seedrandom2 = _interopRequireDefault(_seedrandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSeedNumber = function getSeedNumber(key) {
  return (0, _seedrandom2.default)(key)();
};

var getWinningVariant = exports.getWinningVariant = function getWinningVariant(variants, defaultVariant, seedNumber) {
  var ratioSum = (0, _sum3.default)((0, _map3.default)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        variantId = _ref2[0],
        variant = _ref2[1];

    return variant.ratio;
  }, variants));

  // Seed number (from interval [0, 1]) is interpolated to interval [0-ratio sum]
  var floater = seedNumber * ratioSum;

  var winningVariant = (0, _find3.default)(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        variantId = _ref4[0],
        variant = _ref4[1];

    floater -= variant.ratio;
    return floater <= 0;
  }, variants);
  return winningVariant ? winningVariant[0] : defaultVariant;
};

var setWinningVariant = function setWinningVariant(userId, _ref5) {
  var _ref5$override = _ref5.override,
      override = _ref5$override === undefined ? {} : _ref5$override,
      testSeed = _ref5.testSeed;
  return function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        testId = _ref7[0],
        test = _ref7[1];

    var key = testId + "_" + test.version;
    if (override[key] && test.variants[override[key]]) {
      var variant = override[key];
      return [testId, _extends({}, test, {
        disabled: false,
        disabledReason: null,
        winningVariant: variant
      })];
      return [testId, (0, _assoc3.default)("winningVariant", variant, test)];
    }

    if (test.disabled) {
      return [testId, (0, _assoc3.default)("winningVariant", test.defaultVariant, test)];
    }

    var seedNumber = (0, _isNil3.default)(testSeed) ? getSeedNumber(testId + "_" + test.version + ":" + userId) : testSeed;

    var winningVariant = getWinningVariant((0, _toPairs3.default)(test.variants), test.defaultVariant, seedNumber);
    return [testId, (0, _assoc3.default)("winningVariant", winningVariant, test)];
  };
};

exports.default = setWinningVariant;