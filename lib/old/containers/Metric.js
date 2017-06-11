"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require("immutable");

var _Test = require("./Test");

var _Test2 = _interopRequireDefault(_Test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Metric = function () {
	function Metric(opts) {
		_classCallCheck(this, Metric);

		this.id = opts.id;
		this.testIds = typeof opts.testIds === "string" ? [opts.testIds] : opts.testIds;
		this.loggerIds = typeof opts.loggerIds === "string" ? [opts.loggerIds] : opts.loggerIds;
	}

	_createClass(Metric, [{
		key: "getTests",
		value: function getTests(tests) {
			if (this.testIds.length === 0) {
				return tests;
			}
			return this.testIds.map(function (testId) {
				return tests.get(testId);
			});
		}
	}, {
		key: "getLoggers",
		value: function getLoggers(loggers) {
			if (this.loggerIds.length === 0) {
				return loggers;
			}
			return this.loggerIds.map(function (loggerId) {
				return loggers.get(loggerId);
			});
		}
	}]);

	return Metric;
}();

exports.default = Metric;