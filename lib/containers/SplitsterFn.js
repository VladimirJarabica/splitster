"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackAll = exports.track = exports.getAll = exports.willGetAll = exports.get = exports.willGet = exports.runAll = exports.run = exports.constructSplitster = undefined;

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _splitsterToolsFn = require("../tools/splitsterToolsFn");

var _TestFn = require("./TestFn");

var TestFn = _interopRequireWildcard(_TestFn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  separateTest: false,
  cookies: {
    disable: false,
    expiration: 30,
    name: "splitster"
  }
};
var constructSplitster = exports.constructSplitster = function constructSplitster(config) {
  var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return {
    tests: (0, _splitsterToolsFn.getTestsFromConfig)(config.tests, config.tracks, def),
    userGroups: (0, _splitsterToolsFn.getUserGroupsFromConfig)(config.userGroups),
    tracks: config.tracks,
    options: _ramda2.default.mergeDeepLeft(config.options, defaultOptions),
    user: user
  };
};

var run = exports.run = function run(splitster, testId) {
  return _ramda2.default.assocPath(["tests", testId], TestFn.run(splitster.tests[testId]), splitster);
};

var runAll = exports.runAll = function runAll(splitster) {
  return _ramda2.default.reduce(run, splitster, _ramda2.default.keys(splitster.tests));
};

var willGet = exports.willGet = function willGet(splitster, testId) {
  return _ramda2.default.assocPath(["tests", testId], TestFn.willGet(splitster.tests[testId]), splitster);
};

var get = exports.get = function get(splitster, testId) {
  return TestFn.get(splitster.tests[testId]);
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