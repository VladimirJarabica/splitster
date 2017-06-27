"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _jsCookie = require("js-cookie");

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _cookiesTools = require("../../tools/cookiesTools");

var _SplitsterFn = require("../../containers/SplitsterFn");

var SplitsterFn = _interopRequireWildcard(_SplitsterFn);

var _testToolsFn = require("../../tools/testToolsFn");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SplitsterClient = function SplitsterClient(config, user, def) {
  var _this = this;

  _classCallCheck(this, SplitsterClient);

  this.getSaveResults = function () {
    return (0, _testToolsFn.testsToSaveResults)(_this.state.tests);
  };

  this.saveCookies = function (saveResults) {
    _ramda2.default.forEach(function (key) {
      _jsCookie2.default.set("splitster_" + key, saveResults[key]);
    }, _ramda2.default.keys(saveResults));
  };

  this.run = function (testId) {
    _this.state = SplitsterFn.run(_this.state, testId);

    var saveResults = (0, _testToolsFn.testsToSaveResults)([_this.state.tests[testId]]);
    _this.saveCookies(saveResults);
  };

  this.runAll = function () {
    _this.state = SplitsterFn.runAll(_this.state);

    var saveResults = (0, _testToolsFn.testsToSaveResults)(_this.state.tests);
    _this.saveCookies(saveResults);
  };

  this.get = function (testId) {
    _this.state = SplitsterFn.willGet(_this.state, testId);
    return SplitsterFn.get(_this.state, testId);
  };

  this.getAll = function () {
    _this.state = SplitsterFn.willGetAll(_this.state);
    return SplitsterFn.getAll(_this.state);
  };

  this.track = function (testId) {
    SplitsterFn.track(_this.state, testId);
  };

  this.trackAll = function () {
    SplitsterFn.trackAll(_this.state);
  };

  var savedResults = def || (0, _cookiesTools.parseCookies)(_jsCookie2.default.get());
  this.state = SplitsterFn.constructSplitster(config, user, savedResults);
};

exports.default = SplitsterClient;