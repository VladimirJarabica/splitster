"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require("immutable");

var _Variant = require("./Variant");

var _Variant2 = _interopRequireDefault(_Variant);

var _testTools = require("../tools/testTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestRecord = (0, _immutable.Record)({
	id: "",
	variants: new _immutable.List(),
	segments: new _immutable.List(),
	winner: null
});

var Test = function (_TestRecord) {
	_inherits(Test, _TestRecord);

	function Test(opts) {
		_classCallCheck(this, Test);

		// TODO: Check cookies

		// TODO: Check from server

		// TODO: Check winner variant

		var variants = (0, _immutable.List)(opts.variants.map(function (v) {
			return new _Variant2.default(v);
		}));
		// const winner = getWinningVariant(variants)
		return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, {
			id: opts.id,
			// winner,
			variants: variants,
			segments: opts.segments
		}));
	}

	_createClass(Test, [{
		key: "run",
		value: function run() {
			if (!this.winner) {
				return this.set("winner", (0, _testTools.getWinningVariant)(this.variants));
			}
			// Test has already run
			return this;
		}
	}]);

	return Test;
}(TestRecord);

exports.default = Test;