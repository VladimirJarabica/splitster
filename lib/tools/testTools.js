'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testsToSaveResults = exports.testToSaveResults = exports.getTestSaveResult = exports.getWinningVariant = exports.runTracks = exports.getTracks = exports.getTrack = exports.getDefaultVariant = exports.getVariants = exports.getVariant = undefined;

var _sum = require('ramda/src/sum');

var _sum2 = _interopRequireDefault(_sum);

var _forEach = require('ramda/src/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _partialRight = require('ramda/src/partialRight');

var _partialRight2 = _interopRequireDefault(_partialRight);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _filter = require('ramda/src/filter');

var _filter2 = _interopRequireDefault(_filter);

var _values = require('ramda/src/values');

var _values2 = _interopRequireDefault(_values);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _reduce = require('ramda/src/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _randomJs = require('random-js');

var _randomJs2 = _interopRequireDefault(_randomJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getVariant = exports.getVariant = function getVariant(variantId, variants) {
  return typeof variants[variantId] === 'number' ? { id: variantId, value: variantId, ratio: variants[variantId] } : (0, _assoc2.default)('id', variantId, variants[variantId]);
};

var getVariants = exports.getVariants = function getVariants(variants) {
  return (0, _reduce2.default)(function (acc, key) {
    return (0, _assoc2.default)(key, getVariant(key, variants), acc);
  }, {}, (0, _keys2.default)(variants));
};

var getDefaultVariant = exports.getDefaultVariant = function getDefaultVariant(variants, defaultVariant) {
  return variants[defaultVariant] || (0, _find2.default)((0, _propEq2.default)('def', true), (0, _values2.default)(variants));
};

var getTrack = exports.getTrack = function getTrack(testTrack) {
  var tracks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (testTrack && tracks) {
    if (typeof testTrack === 'string') {
      return tracks[testTrack];
    }
    return testTrack;
  }
  return null;
};

var getTracks = exports.getTracks = function getTracks(testTracks) {
  var tracks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (Array.isArray(testTracks)) {
    return (0, _filter2.default)(Boolean, (0, _map2.default)((0, _partialRight2.default)(getTrack, [tracks]), testTracks));
  }
  if (testTracks) {
    return (0, _filter2.default)(Boolean, (0, _map2.default)((0, _partialRight2.default)(getTrack, [tracks]), [getTrack(testTracks, tracks)]));
  }
  return [];
};

var runTracks = exports.runTracks = function runTracks(tracks, result) {
  return (0, _forEach2.default)(function (track) {
    track(result);
  }, tracks);
};

// TODO: write tests ?? random
var getWinningVariant = exports.getWinningVariant = function getWinningVariant(variants, defaultVariant) {
  var ratioSum = (0, _sum2.default)((0, _map2.default)(function (variant) {
    return variant.ratio;
  }, variants));

  var rand = _randomJs2.default.integer(1, ratioSum)(_randomJs2.default.engines.nativeMath);

  var winningVariant = (0, _find2.default)(function (variant) {
    rand -= variant.ratio;
    return rand <= 0;
  }, variants);
  return winningVariant || defaultVariant;
};

var getTestSaveResult = exports.getTestSaveResult = function getTestSaveResult(test) {
  if (test.disabled) {
    return '__disabled_' + test.disabledReason;
  }
  if (test.winningVariant) {
    return test.winningVariant.id;
  }
  return '';
};

// TODO: write tests
var testToSaveResults = exports.testToSaveResults = function testToSaveResults(saveResults, test) {
  return (0, _assoc2.default)(
  // If version is greater than 0, add it as after postfix (compatibility) variantId_versionNum
  '' + test.id + (test.version > 0 ? '_' + test.version : ''), getTestSaveResult(test), saveResults);
};

// TODO: write tests
var testsToSaveResults = exports.testsToSaveResults = function testsToSaveResults(tests) {
  return (0, _reduce2.default)(testToSaveResults, {}, (0, _values2.default)(tests));
};