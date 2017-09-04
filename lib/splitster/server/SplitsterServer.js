'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Splitster = require('../../containers/Splitster');

var SplitsterFn = _interopRequireWildcard(_Splitster);

var _testTools = require('../../tools/testTools');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SplitsterServer = function SplitsterServer(config, user, def) {
  var _this = this;

  _classCallCheck(this, SplitsterServer);

  this.getSaveResults = function () {
    return (0, _testTools.testsToSaveResults)(_this.state.tests);
  };

  this.run = function (testId) {
    _this.state = SplitsterFn.run(_this.state, testId);
  };

  this.runAll = function () {
    _this.state = SplitsterFn.runAll(_this.state);
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

  // TODO: def??
  this.state = SplitsterFn.constructSplitster(config, user, def);
};

exports.default = SplitsterServer;