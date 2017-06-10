import Cookies from "js-cookie"

import Test from "./containers/Test"
import Variant from "./containers/Variant"
import Metric from "./containers/Metric"
import SplitsterState from "./state/SplitsterState"

let state: SplitsterState | null = null

export const init = () => {
	state = new SplitsterState()
}

export const registerTest = (test: Test) => {
	state = state.addTest(test)
	
	// TODO: nicer
	Cookies.set(test.id, test.winner.id)
}

export const registerLogger = (id: string, logger: Function) => {
	state = state.addLogger(id, logger)
}

export const registerMetric = (id: string, testIds: string | Array<string>, loggerIds: string | Array<string>) => {
	const metric = new Metric({ id, testIds, loggerIds })
	state = state.addMetric(metric)
}

export const fire = (metricId: string) => {
	const metric = state.metrics.get(metricId)
	const tests = metric.getTests(state.tests)
	const loggers = metric.getLoggers(state.loggers)
	loggers.forEach((logger: Function) => {
		logger(tests)
	})
	
}

export const getState = (): SplitsterState => {
	return state
}

// TODO: Test
export const getWinner = (id: string): Variant | null => {
	return state.tests.has(id) ? state.tests.get(id).winner : null
}
