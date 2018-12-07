'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toPairs = require('ramda/src/toPairs');

var _toPairs2 = _interopRequireDefault(_toPairs);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _sum = require('ramda/src/sum');

var _sum2 = _interopRequireDefault(_sum);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _seedrandom = require('seedrandom');

var _seedrandom2 = _interopRequireDefault(_seedrandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSeedNumber = function getSeedNumber(key) {
  return (0, _seedrandom2.default)(key)();
};

var getWinningVariant = function getWinningVariant(variants, defaultVariant, seedNumber) {
  var ratioSum = (0, _sum2.default)((0, _map2.default)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        variantId = _ref2[0],
        variant = _ref2[1];

    return variant.ratio;
  }, variants));

  // Seed number (from interval [0, 1]) is interpolated to interval [0-ratio sum]
  var floater = seedNumber * ratioSum;

  var winningVariant = (0, _find2.default)(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        variantId = _ref4[0],
        variant = _ref4[1];

    floater -= variant.ratio;
    return floater <= 0;
  }, variants);
  return winningVariant[0] || defaultVariant;
};

var setWinningVariant = function setWinningVariant(userId) {
  return function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        testId = _ref6[0],
        test = _ref6[1];

    if (test.disabled) {
      return [testId, (0, _assoc2.default)('winningVariant', test.defaultVariant, test)];
    }

    var seedNumber = getSeedNumber(testId + '_' + test.version + ':' + userId);
    console.log('seedNumber', testId + '_' + test.version + ':' + userId, seedNumber);

    var winningVariant = getWinningVariant((0, _toPairs2.default)(test.variants), test.defaultVariant, seedNumber);
    console.log('winningVariant', winningVariant);
    return [testId, (0, _assoc2.default)('winningVariant', winningVariant, test)];
  };
};

exports.default = setWinningVariant;