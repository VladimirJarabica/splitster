"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getWinningVariant = undefined;

var _immutable = require("immutable");

var _randomJs = require("random-js");

var _randomJs2 = _interopRequireDefault(_randomJs);

var _Variant = require("../containers/Variant");

var _Variant2 = _interopRequireDefault(_Variant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getWinningVariant = exports.getWinningVariant = function getWinningVariant(variants) {
	var ratioSum = variants.reduce(function (acc, variant) {
		return acc + variant.ratio;
	}, 0);

	var rand = _randomJs2.default.integer(0, ratioSum)(_randomJs2.default.engines.nativeMath);

	var winningVariant = variants.find(function (variant) {
		rand -= variant.ratio;

		return rand < 0;
	});

	return winningVariant || variants.first();
};