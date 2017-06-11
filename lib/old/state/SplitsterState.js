"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require("immutable");

var _Test = require("../containers/Test");

var _Test2 = _interopRequireDefault(_Test);

var _Metric = require("../containers/Metric");

var _Metric2 = _interopRequireDefault(_Metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplisterStateRecord = (0, _immutable.Record)({
	tests: (0, _immutable.Map)(),
	loggers: (0, _immutable.Map)(),
	metrics: (0, _immutable.Map)()
});

var SplitsterState = function (_SplisterStateRecord) {
	_inherits(SplitsterState, _SplisterStateRecord);

	function SplitsterState() {
		_classCallCheck(this, SplitsterState);

		// TODO: initialize splitster state. Now should init by cookies, local storage, etc
		var tests = (0, _immutable.Map)();
		var loggers = (0, _immutable.Map)();
		return _possibleConstructorReturn(this, (SplitsterState.__proto__ || Object.getPrototypeOf(SplitsterState)).call(this, { tests: tests, loggers: loggers }));
	}

	_createClass(SplitsterState, [{
		key: "addTest",
		value: function addTest(test) {
			return this.setIn(["tests", test.id], test);
		}
	}, {
		key: "addLogger",
		value: function addLogger(id, logger) {
			return this.setIn(["loggers", id], logger);
		}
	}, {
		key: "addMetric",
		value: function addMetric(metric) {
			return this.setIn(["metrics", metric.id], metric);
		}
	}]);

	return SplitsterState;
}(SplisterStateRecord);

exports.default = SplitsterState;