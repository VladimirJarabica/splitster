'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResult = exports.track = exports.set = exports.get = exports.willGet = exports.setAsUsed = exports.run = exports.constructTest = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _testTools = require('../tools/testTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTestOptions = {};

var constructTest = exports.constructTest = function constructTest(id, config) {
  var tracks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments[3];

  var _R$merge = _ramda2.default.merge(defaultTestOptions, options),
      winningVariant = _R$merge.winningVariant;

  var variants = (0, _testTools.getVariants)(config.variants);
  var isDisabled = config.disabled || winningVariant === '__disabled' || false;

  var winningVariantSet = Boolean(!isDisabled && winningVariant && winningVariant !== '__disabled');

  return {
    id: id,
    variants: variants,
    runTrack: (0, _testTools.getTracks)(config.runTrack, tracks),
    useTrack: (0, _testTools.getTracks)(config.useTrack, tracks),
    endTrack: (0, _testTools.getTracks)(config.endTrack, tracks),
    usage: _ramda2.default.pathOr(100, 'usage', config),
    description: config.description,

    winningVariant: winningVariantSet && winningVariant ? variants[winningVariant] : null,
    defaultVariant: (0, _testTools.getDefaultVariant)(variants, config.defaultVariant),
    disabled: isDisabled,

    used: winningVariantSet
  };
};

var run = exports.run = function run(test) {
  (0, _testTools.runTracks)(test.runTrack, test);

  if (test.winningVariant) {
    return test;
  }

  return _ramda2.default.assoc('winningVariant', test.disabled ? test.defaultVariant : (0, _testTools.getWinningVariant)(_ramda2.default.values(test.variants), test.defaultVariant), test);
};

var setAsUsed = exports.setAsUsed = function setAsUsed(test) {
  return _ramda2.default.assoc('used', true, test);
};

var willGet = exports.willGet = function willGet(test) {
  if (!test.used) {
    (0, _testTools.runTracks)(test.useTrack, test);
  }
  return setAsUsed(test);
};

var get = exports.get = function get(test) {
  return test.winningVariant || test.defaultVariant;
};

var set = exports.set = function set(test, variantId) {
  return _ramda2.default.assoc('winningVariant', _ramda2.default.pathOr(test.winningVariant, ['variants', variantId], test), test);
};

var track = exports.track = function track(test) {
  return (0, _testTools.runTracks)(test.endTrack, test);
};

// TODO: For now return VariantConfig - specify test result
var getResult = exports.getResult = function getResult(test) {
  return test;
};