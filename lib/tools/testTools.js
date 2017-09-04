'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testsToSaveResults = exports.testToSaveResults = exports.getWinningVariant = exports.runTracks = exports.getTracks = exports.getTrack = exports.getDefaultVariant = exports.getVariants = exports.getVariant = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _randomJs = require('random-js');

var _randomJs2 = _interopRequireDefault(_randomJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getVariant = exports.getVariant = function getVariant(variantId, variants) {
  return typeof variants[variantId] === 'number' ? { id: variantId, value: variantId, ratio: variants[variantId] } : _ramda2.default.assoc('id', variantId, variants[variantId]);
};

var getVariants = exports.getVariants = function getVariants(variants) {
  return _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, getVariant(key, variants), acc);
  }, {}, _ramda2.default.keys(variants));
};

var getDefaultVariant = exports.getDefaultVariant = function getDefaultVariant(variants, defaultVariant) {
  return variants[defaultVariant] || _ramda2.default.find(_ramda2.default.propEq('def', true), _ramda2.default.values(variants));
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
    return _ramda2.default.filter(Boolean, _ramda2.default.map(_ramda2.default.partialRight(getTrack, [tracks]), testTracks));
  }
  if (testTracks) {
    return _ramda2.default.filter(Boolean, _ramda2.default.map(_ramda2.default.partialRight(getTrack, [tracks]), [getTrack(testTracks, tracks)]));
  }
  return [];
};

var runTracks = exports.runTracks = function runTracks(tracks, result) {
  return _ramda2.default.forEach(function (track) {
    track(result);
  }, tracks);
};

// TODO: write tests ?? random
var getWinningVariant = exports.getWinningVariant = function getWinningVariant(variants, defaultVariant) {
  var ratioSum = _ramda2.default.sum(_ramda2.default.map(function (variant) {
    return variant.ratio;
  }, variants));

  var rand = _randomJs2.default.integer(1, ratioSum)(_randomJs2.default.engines.nativeMath);

  var winningVariant = _ramda2.default.find(function (variant) {
    rand -= variant.ratio;
    return rand <= 0;
  }, variants);
  return winningVariant || defaultVariant;
};

// TODO: write tests
var testToSaveResults = exports.testToSaveResults = function testToSaveResults(saveResults, test) {
  return _ramda2.default.assoc(test.id, test.winningVariant ? test.winningVariant.id : '', saveResults);
};

// TODO: write tests
var testsToSaveResults = exports.testsToSaveResults = function testsToSaveResults(tests) {
  return _ramda2.default.reduce(testToSaveResults, {}, _ramda2.default.values(tests));
};