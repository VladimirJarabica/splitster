// @flow
import SplitsterState from "../state/SplitsterState"

type Opts = {
	rewriteCookie: boolean,
	fullTest: boolean,
}

const defaultOpts: Opts = {
	rewriteCookie: false,
	fullTest: false,
}
/**
 * Set splitster tests winners to response
 * @param splitsterState: SplitsterState
 * @param req
 * @param res
 * @param opts: Opts
 */
const server = (splitsterState: SplitsterState, req: Object, res: Object, opts: Opts = defaultOpts): void => {
	splitsterState.tests.forEach(test => {
		const testCookieName = "splitster_test_" + test.id
		if (!req.cookies[testCookieName] || opts.rewriteCookie) {
			res.cookie(testCookieName, test.winner.id)
			if (opts.fullTest) {
				test.variants.forEach(variant => {
					const variantCookieName = "splitster_test-variant_" + test.id + "_" + variant.id
					if (!req.cookies[variantCookieName] || opts.rewriteCookie) {
						res.cookie(variantCookieName, variant.ratio)
					}
				})
			}
		}
	})
}

export default server
