'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResult = exports.track = exports.set = exports.get = exports.willGet = exports.setAsUsed = exports.run = exports.constructTest = undefined;

var _values = require('ramda/src/values');

var _values2 = _interopRequireDefault(_values);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _pathOr = require('ramda/src/pathOr');

var _pathOr2 = _interopRequireDefault(_pathOr);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _testTools = require('../tools/testTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTestOptions = {};

var constructTest = exports.constructTest = function constructTest(id, config) {
  var tracks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments[3];

  var _R$merge = (0, _merge2.default)(defaultTestOptions, options),
      winningVariant = _R$merge.winningVariant;

  var variants = (0, _testTools.getVariants)(config.variants);

  return {
    id: id,
    variants: variants,
    runTrack: (0, _testTools.getTracks)(config.runTrack, tracks),
    useTrack: (0, _testTools.getTracks)(config.useTrack, tracks),
    endTrack: (0, _testTools.getTracks)(config.endTrack, tracks),
    usage: (0, _pathOr2.default)(100, 'usage', config),
    description: config.description,

    winningVariant: !config.disabled && winningVariant ? variants[winningVariant] : null,
    defaultVariant: (0, _testTools.getDefaultVariant)(variants, config.defaultVariant),

    disabled: config.disabled,
    disabledReason: config.disabledReason,

    used: false
  };
};

var run = exports.run = function run(test) {
  if (!test.disabled) {
    (0, _testTools.runTracks)(test.runTrack, test);
  }

  if (test.winningVariant) {
    return test;
  }

  return (0, _assoc2.default)('winningVariant', test.disabled ? test.defaultVariant : (0, _testTools.getWinningVariant)((0, _values2.default)(test.variants), test.defaultVariant), test);
};

var setAsUsed = exports.setAsUsed = function setAsUsed(test) {
  return (0, _assoc2.default)('used', true, test);
};

var willGet = exports.willGet = function willGet(test) {
  if (test.used) {
    return test;
  }

  if (!test.disabled) {
    (0, _testTools.runTracks)(test.useTrack, test);
  }
  return setAsUsed(test);
};

var get = exports.get = function get(test) {
  return test.winningVariant || test.defaultVariant;
};

var set = exports.set = function set(test, variantId) {
  return (0, _assoc2.default)('winningVariant', (0, _pathOr2.default)(test.winningVariant, ['variants', variantId], test), test);
};

var track = exports.track = function track(test) {
  if (!test.disabled) {
    (0, _testTools.runTracks)(test.endTrack, test);
  }
};

// TODO: For now return VariantConfig - specify test result
var getResult = exports.getResult = function getResult(test) {
  return test;
};