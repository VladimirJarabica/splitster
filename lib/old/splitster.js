"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getWinner = exports.getState = exports.fire = exports.registerMetric = exports.registerLogger = exports.registerTest = exports.init = undefined;

var _jsCookie = require("js-cookie");

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _Test = require("./containers/Test");

var _Test2 = _interopRequireDefault(_Test);

var _Variant = require("./containers/Variant");

var _Variant2 = _interopRequireDefault(_Variant);

var _Metric = require("./containers/Metric");

var _Metric2 = _interopRequireDefault(_Metric);

var _SplitsterState = require("./state/SplitsterState");

var _SplitsterState2 = _interopRequireDefault(_SplitsterState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = null;

var init = exports.init = function init() {
	state = new _SplitsterState2.default();
};

var registerTest = exports.registerTest = function registerTest(test) {
	state = state.addTest(test);

	// TODO: nicer
	_jsCookie2.default.set(test.id, test.winner.id);
};

var registerLogger = exports.registerLogger = function registerLogger(id, logger) {
	state = state.addLogger(id, logger);
};

var registerMetric = exports.registerMetric = function registerMetric(id, testIds, loggerIds) {
	var metric = new _Metric2.default({ id: id, testIds: testIds, loggerIds: loggerIds });
	state = state.addMetric(metric);
};

var fire = exports.fire = function fire(metricId) {
	var metric = state.metrics.get(metricId);
	var tests = metric.getTests(state.tests);
	var loggers = metric.getLoggers(state.loggers);
	loggers.forEach(function (logger) {
		logger(tests);
	});
};

var getState = exports.getState = function getState() {
	return state;
};

// TODO: Test
var getWinner = exports.getWinner = function getWinner(id) {
	return state.tests.has(id) ? state.tests.get(id).winner : null;
};