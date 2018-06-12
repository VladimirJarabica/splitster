'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _split = require('ramda/src/split');

var _split2 = _interopRequireDefault(_split);

var _head = require('ramda/src/head');

var _head2 = _interopRequireDefault(_head);

var _map = require('ramda/src/map');

var _map2 = _interopRequireDefault(_map);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _startsWith = require('ramda/src/startsWith');

var _startsWith2 = _interopRequireDefault(_startsWith);

var _filter = require('ramda/src/filter');

var _filter2 = _interopRequireDefault(_filter);

var _forEach = require('ramda/src/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _propOr = require('ramda/src/propOr');

var _propOr2 = _interopRequireDefault(_propOr);

var _mergeDeepLeft = require('ramda/src/mergeDeepLeft');

var _mergeDeepLeft2 = _interopRequireDefault(_mergeDeepLeft);

var _pathOr = require('ramda/src/pathOr');

var _pathOr2 = _interopRequireDefault(_pathOr);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _cookiesTools = require('../../tools/cookiesTools');

var _Splitster = require('../../containers/Splitster');

var SplitsterFn = _interopRequireWildcard(_Splitster);

var _testTools = require('../../tools/testTools');

var _splitsterTools = require('../../tools/splitsterTools');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SplitsterClient = function SplitsterClient(config, user, def, copy) {
  _classCallCheck(this, SplitsterClient);

  _initialiseProps.call(this);

  if (!config && !user && !def && copy) {
    this.state = copy;
    return;
  }
  var cookiesDisabled = (0, _pathOr2.default)(false, ['options', 'cookies', 'disabled'], config);
  if (cookiesDisabled) {
    this.deleteCookies();
  }
  if (!cookiesDisabled && def) {
    // If there is default set (server side) try to save it to cookies
    this.saveCookies(def, config);
  }
  var savedResults = def || (cookiesDisabled ? {} : (0, _cookiesTools.parseCookies)(_jsCookie2.default.get()));
  // $FlowFixMe
  this.state = SplitsterFn.constructSplitster(config, user, savedResults);
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.getSaveResults = function () {
    return (0, _testTools.testsToSaveResults)(_this.state.tests);
  };

  this.saveCookies = function (saveResults, customConfig) {
    var config = _this.state ? _this.state.config : customConfig;
    if ((0, _pathOr2.default)(false, ['options', 'cookies', 'disabled'], config)) {
      return;
    }
    var options = (0, _mergeDeepLeft2.default)((0, _propOr2.default)({}, 'options', config), SplitsterFn.defaultOptions);
    var cookieKeys = (0, _keys2.default)(_jsCookie2.default.get());
    (0, _forEach2.default)(function (key) {
      var _parseTestVersionKey = (0, _splitsterTools.parseTestVersionKey)(key, config),
          testId = _parseTestVersionKey.testId,
          version = _parseTestVersionKey.version;

      var unversionedPrefix = 'splitster_' + testId;
      var cookieKey = unversionedPrefix + '_' + version;
      var cookieValue = _jsCookie2.default.get(cookieKey);

      // Get all cookies of this test except current version
      var testCookies = (0, _filter2.default)(function (testCookie) {
        return testCookie !== cookieKey && (0, _startsWith2.default)(unversionedPrefix, testCookie);
      })(cookieKeys);

      // Remove all cookies of test expect current version
      testCookies.forEach(function (testCookie) {
        return _jsCookie2.default.remove(testCookie);
      });

      if (
      // Cookie is not set already
      !cookieValue ||
      // Rewrite wrong set cookie
      cookieValue === '__disabled_null' ||
      // Rewrite disabled by config
      cookieValue === '__disabled_config' && saveResults[key] !== '__disabled_config' ||
      // Rewrite to disabled by config
      cookieValue !== '__disabled_config' && saveResults[key] === '__disabled_config') {
        _jsCookie2.default.set(cookieKey, saveResults[key], (0, _pathOr2.default)(SplitsterFn.defaultOptions, ['cookies', 'cookiesOptions'], options));
      }
    }, (0, _keys2.default)(saveResults));
  };

  this.deleteCookies = function () {
    return (0, _compose2.default)((0, _forEach2.default)(_jsCookie2.default.remove), (0, _filter2.default)((0, _startsWith2.default)('splitster_')), (0, _map2.default)(_head2.default), (0, _map2.default)((0, _split2.default)('=')), (0, _split2.default)('; '))(document.cookie || '');
  };

  this.run = function (testId) {
    if (!SplitsterFn.hasTest(_this.state, testId)) {
      return;
    }
    _this.state = SplitsterFn.run(_this.state, testId);

    var saveResults = (0, _testTools.testsToSaveResults)({
      testId: _this.state.tests[testId]
    });
    _this.saveCookies(saveResults);
  };

  this.runAll = function () {
    _this.state = SplitsterFn.runAll(_this.state);

    var saveResults = (0, _testTools.testsToSaveResults)(_this.state.tests);
    _this.saveCookies(saveResults);
  };

  this.get = function (testId) {
    if (!SplitsterFn.hasTest(_this.state, testId)) {
      console.warn('Splitster: Trying to access not existing test: ' + testId + ', your value will be null.');
      return {
        value: null
      };
    }
    _this.state = SplitsterFn.willGet(_this.state, testId);
    return SplitsterFn.get(_this.state, testId);
  };

  this.getAll = function () {
    _this.state = SplitsterFn.willGetAll(_this.state);
    return SplitsterFn.getAll(_this.state);
  };

  this.set = function (testId, variantId, cookies) {
    if (!SplitsterFn.hasTest(_this.state, testId)) {
      return _this;
    }
    if (cookies) {
      var cookieKey = 'splitster_' + testId + '_' + _this.state.tests[testId].version;
      _jsCookie2.default.set(cookieKey, variantId, (0, _pathOr2.default)(SplitsterFn.defaultOptions, ['config', 'options', 'cookies', 'cookiesOptions'], _this.state));
    }
    return new SplitsterClient(null, null, null, SplitsterFn.set(_this.state, testId, variantId));
  };

  this.track = function (testId) {
    if (!SplitsterFn.hasTest(_this.state, testId)) {
      return;
    }
    SplitsterFn.track(_this.state, testId);
  };

  this.trackAll = function () {
    SplitsterFn.trackAll(_this.state);
  };
};

exports.default = SplitsterClient;