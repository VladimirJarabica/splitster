"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _SplitsterState = require("../state/SplitsterState");

var _SplitsterState2 = _interopRequireDefault(_SplitsterState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOpts = {
	rewriteCookie: false,
	fullTest: false
};
/**
 * Set splitster tests winners to response
 * @param splitsterState: SplitsterState
 * @param req
 * @param res
 * @param opts: Opts
 */

var server = function server(splitsterState, req, res) {
	var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultOpts;

	splitsterState.tests.forEach(function (test) {
		var testCookieName = "splitster_test_" + test.id;
		if (!req.cookies[testCookieName] || opts.rewriteCookie) {
			res.cookie(testCookieName, test.winner.id);
			if (opts.fullTest) {
				test.variants.forEach(function (variant) {
					var variantCookieName = "splitster_test-variant_" + test.id + "_" + variant.id;
					if (!req.cookies[variantCookieName] || opts.rewriteCookie) {
						res.cookie(variantCookieName, variant.ratio);
					}
				});
			}
		}
	});
};

exports.default = server;