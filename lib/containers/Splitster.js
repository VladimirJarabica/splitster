'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackAll = exports.track = exports.getAll = exports.willGetAll = exports.set = exports.get = exports.willGet = exports.runAll = exports.run = exports.constructSplitster = undefined;

var _partial = require('ramda/src/partial');

var _partial2 = _interopRequireDefault(_partial);

var _forEach = require('ramda/src/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _reduce = require('ramda/src/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _assocPath = require('ramda/src/assocPath');

var _assocPath2 = _interopRequireDefault(_assocPath);

var _mergeDeepLeft = require('ramda/src/mergeDeepLeft');

var _mergeDeepLeft2 = _interopRequireDefault(_mergeDeepLeft);

var _pathOr = require('ramda/src/pathOr');

var _pathOr2 = _interopRequireDefault(_pathOr);

var _splitsterTools = require('../tools/splitsterTools');

var _Test = require('./Test');

var TestFn = _interopRequireWildcard(_Test);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  separateTest: false,
  cookies: {
    disabled: false,
    expiration: 30,
    name: 'splitster'
  }
};
var constructSplitster = exports.constructSplitster = function constructSplitster(config) {
  var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var def = arguments[2];

  var userGroups = (0, _splitsterTools.getUserGroupsFromConfig)(config.userGroups);
  var tests = (0, _splitsterTools.getTestsFromConfig)(config.tests, {
    tracks: config.tracks,
    def: def,
    separate: (0, _pathOr2.default)(false, ['options', 'separateTest'], config),
    user: user,
    userGroups: userGroups
  });

  return {
    tests: tests,
    userGroups: userGroups,
    tracks: config.tracks,
    options: (0, _mergeDeepLeft2.default)(config.options, defaultOptions),
    user: user,
    config: config
  };
};

var run = exports.run = function run(splitster, testId) {
  return (0, _assocPath2.default)(['tests', testId], TestFn.run(splitster.tests[testId]), splitster);
};

var runAll = exports.runAll = function runAll(splitster) {
  return (0, _reduce2.default)(run, splitster, (0, _keys2.default)(splitster.tests));
};

var willGet = exports.willGet = function willGet(splitster, testId) {
  return (0, _assocPath2.default)(['tests', testId], TestFn.willGet(splitster.tests[testId]), splitster);
};

var get = exports.get = function get(splitster, testId) {
  return TestFn.get(splitster.tests[testId]);
};

// Custom set of variant (debug)
var set = exports.set = function set(splitster, testId, variantId) {
  return (0, _assocPath2.default)(['tests', testId], TestFn.set(splitster.tests[testId], variantId), splitster);
};

var willGetAll = exports.willGetAll = function willGetAll(splitster) {
  return (0, _reduce2.default)(willGet, splitster, (0, _keys2.default)(splitster.tests));
};

var getAll = exports.getAll = function getAll(splitster) {
  return (0, _reduce2.default)(function (acc, key) {
    return (0, _assoc2.default)(key, get(splitster, key), acc);
  }, {}, (0, _keys2.default)(splitster.tests));
};

var track = exports.track = function track(splitster, testId) {
  return TestFn.track(splitster.tests[testId]);
};

var trackAll = exports.trackAll = function trackAll(splitster) {
  return (0, _forEach2.default)((0, _partial2.default)(track, [splitster]), _keys2.default[splitster.tests]);
};