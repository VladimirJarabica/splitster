"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _Test = require("./Test");

var _Test2 = _interopRequireDefault(_Test);

var _UserGroup = require("./UserGroup");

var _UserGroup2 = _interopRequireDefault(_UserGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Splitster = function Splitster(config, user) {
  var _this = this;

  _classCallCheck(this, Splitster);

  this.run = function (testId) {
    _this.tests[testId].run();
  };

  this.runAll = function () {
    _ramda2.default.forEach(_this.run, _ramda2.default.keys(_this.tests));
  };

  this.get = function (testId) {
    _this.tests[testId].get();
  };

  this.getAll = function () {
    return _ramda2.default.map(_this.get, _ramda2.default.keys(_this.tests));
  };

  this.tracks = _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, config.tracks[key], acc);
  }, {}, _ramda2.default.keys(config.tracks));

  this.tests = _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, new _Test2.default(config.tests[key], _this.tracks), acc);
  }, {}, _ramda2.default.keys(config.tests));

  this.userGroups = _ramda2.default.reduce(function (acc, key) {
    return _ramda2.default.assoc(key, new _UserGroup2.default(config.userGroups[key]), acc);
  }, {}, _ramda2.default.keys(config.userGroups));

  this.options = config.options;
};

exports.default = Splitster;