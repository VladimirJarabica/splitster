'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackAll = exports.track = exports.getAll = exports.willGetAll = exports.set = exports.get = exports.willGet = exports.runAll = exports.run = exports.constructSplitster = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

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
    separate: _ramda2.default.pathOr(false, ['options', 'separateTest'], config),
    user: user,
    userGroups: userGroups
  });

  return {
    tests: tests,
    userGroups: userGroups,
    tracks: config.tracks,
    options: _ramda2.default.mergeDeepLeft(config.options, defaultOptions),
    user: user,
    config: config
  };
};

var run = exports.run = function run(splitster, testId) {
  return _ramda2.default.assocPath(['tests', testId], TestFn.run(splitster.tests[testId]), splitster);
};

var runAll = exports.runAll = function runAll(splitster) {
  return _ramda2.default.reduce(run, splitster, _ramda2.default.keys(splitster.tests));
};

var willGet = exports.willGet = function willGet(splitster, testId) {
  return _ramda2.default.assocPath(['tests', testId], TestFn.willGet(splitster.tests[testId]), splitster);
};

var get = exports.get = function get(splitster, testId) {
  return TestFn.get(splitster.tests[testId]);
};

// Custom set of variant (debug)
var set = exports.set = function set(splitster, testId, variantId) {
  return _ramda2.default.assocPath(['tests', testId], TestFn.set(splitster.tests[testId], variantId), splitster);
};

var willGetAll = exports.willGetAll = function willGetAll(splitster) {
  return _ramda2.default.reduce(willGet, splitster, _ramda2.default.keys(splitster.tests));
};

var getAll = exports.getAll = function getAll(splitster) {
  return _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, get(splitster, key), acc);
  }, {}, _ramda2.default.keys(splitster.tests));
};

var track = exports.track = function track(splitster, testId) {
  return TestFn.track(splitster.tests[testId]);
};

var trackAll = exports.trackAll = function trackAll(splitster) {
  return _ramda2.default.forEach(_ramda2.default.partial(track, [splitster]), _ramda2.default.keys[splitster.tests]);
};