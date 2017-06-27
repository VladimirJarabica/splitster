"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResult = exports.track = exports.get = exports.willGet = exports.setAsUsed = exports.run = exports.constructTest = undefined;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _testToolsFn = require("../tools/testToolsFn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTestOptions = {
  disabled: false
};

var constructTest = exports.constructTest = function constructTest(id, config) {
  var tracks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments[3];

  var _R$merge = _ramda2.default.merge(defaultTestOptions, options),
      disabled = _R$merge.disabled,
      winningVariant = _R$merge.winningVariant;

  var variants = (0, _testToolsFn.getVariants)(config.variants);
  return {
    id: id,
    variants: (0, _testToolsFn.getVariants)(variants),
    defaultVariant: (0, _testToolsFn.getDefaultVariant)(variants, config.defaultVariant),
    runTrack: (0, _testToolsFn.getTracks)(config.runTrack, tracks),
    useTrack: (0, _testToolsFn.getTracks)(config.useTrack, tracks),
    endTrack: (0, _testToolsFn.getTracks)(config.endTrack, tracks),
    disabled: disabled || false,
    winningVariant: winningVariant ? variants[winningVariant] : null,
    used: false
  };
};

var run = exports.run = function run(test) {
  (0, _testToolsFn.runTracks)(test.runTrack);

  if (test.winningVariant) {
    return test;
  }

  return _ramda2.default.assoc("winningVariant", test.disabled ? test.defaultVariant : (0, _testToolsFn.getWinningVariant)(_ramda2.default.values(test.variants), test.defaultVariant), test);
};

var setAsUsed = exports.setAsUsed = function setAsUsed(test) {
  return _ramda2.default.assoc("used", true, test);
};

var willGet = exports.willGet = function willGet(test) {
  if (!test.used) {
    (0, _testToolsFn.runTracks)(test.useTrack);
  }
  return setAsUsed(test);
};

var get = exports.get = function get(test) {
  return test.winningVariant || test.defaultVariant;
};

var track = exports.track = function track(test) {
  return (0, _testToolsFn.runTracks)(test.endTrack);
};

// TODO: For now return VariantConfig - specify test result
var getResult = exports.getResult = function getResult(test) {
  return test.winningVariant;
};