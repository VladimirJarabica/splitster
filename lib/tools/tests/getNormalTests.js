'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTestsOpts = undefined;

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _reduce = require('ramda/src/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _Test = require('../../containers/Test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTestsOpts = exports.createTestsOpts = function createTestsOpts(def) {
  return {
    winningVariant: def || null
  };
};

var getNormalTests = function getNormalTests(_ref) {
  var _ref$tracks = _ref.tracks,
      tracks = _ref$tracks === undefined ? {} : _ref$tracks,
      _ref$def = _ref.def,
      def = _ref$def === undefined ? {} : _ref$def;
  return function () {
    var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _reduce2.default)(function (acc, key) {
      return (0, _assoc2.default)(key, (0, _Test.constructTest)(key, tests[key], tracks, createTestsOpts(def[key])), acc);
    }, {}, (0, _keys2.default)(tests));
  };
};

exports.default = getNormalTests;