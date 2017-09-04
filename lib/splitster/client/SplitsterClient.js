'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _cookiesTools = require('../../tools/cookiesTools');

var _Splitster = require('../../containers/Splitster');

var SplitsterFn = _interopRequireWildcard(_Splitster);

var _testTools = require('../../tools/testTools');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SplitsterClient = function SplitsterClient(config, user, def, copy) {
  var _this = this;

  _classCallCheck(this, SplitsterClient);

  this.getSaveResults = function () {
    return (0, _testTools.testsToSaveResults)(_this.state.tests);
  };

  this.saveCookies = function (saveResults) {
    _ramda2.default.forEach(function (key) {
      var cookieKey = 'splitster_' + key;
      if (!_jsCookie2.default.get(cookieKey)) {
        // Only save cookie if it is not saved already
        _jsCookie2.default.set(cookieKey, saveResults[key]);
      }
    }, _ramda2.default.keys(saveResults));
  };

  this.run = function (testId) {
    _this.state = SplitsterFn.run(_this.state, testId);

    var saveResults = (0, _testTools.testsToSaveResults)({ testId: _this.state.tests[testId] });
    _this.saveCookies(saveResults);
  };

  this.runAll = function () {
    _this.state = SplitsterFn.runAll(_this.state);

    var saveResults = (0, _testTools.testsToSaveResults)(_this.state.tests);
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

  this.set = function (testId, variantId) {
    return new SplitsterClient(null, null, null, SplitsterFn.set(_this.state, testId, variantId));
  };

  this.track = function (testId) {
    SplitsterFn.track(_this.state, testId);
  };

  this.trackAll = function () {
    SplitsterFn.trackAll(_this.state);
  };

  if (!config && !user && !def && copy) {
    this.state = copy;
    return;
  }
  var cookiesDisabled = _ramda2.default.pathOr(false, ['options', 'cookies', 'disabled'], config);
  if (!cookiesDisabled && def) {
    // If there is default set (server side) try to save it to cookies
    this.saveCookies(def);
  }
  var savedResults = def || (cookiesDisabled ? {} : (0, _cookiesTools.parseCookies)(_jsCookie2.default.get()));
  // $FlowFixMe
  this.state = SplitsterFn.constructSplitster(config, user, savedResults);
};

exports.default = SplitsterClient;