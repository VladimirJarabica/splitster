import { Record, Map } from "immutable"

import Test from "../containers/Test"
import Metric from "../containers/Metric"

const SplisterStateRecord = Record({
	tests: Map(),
	loggers: Map(),
	metrics: Map(),
})

export default class SplitsterState extends SplisterStateRecord {
	
	tests: Map<Test>
	loggers: Map<string, Function>
	metrics: Map<Metric>
	
	constructor() {
		// TODO: initialize splitster state. Now should init by cookies, local storage, etc
		const tests = Map()
		const loggers = Map()
		super({ tests, loggers})
	}
	
	addTest(test: Test) {
		return this.setIn(["tests", test.id], test)
	}
	
	addLogger(id: string, logger: Function) {
		return this.setIn(["loggers", id], logger)
	}
	
	addMetric(metric: Metric) {
		return this.setIn(["metrics", metric.id], metric)
	}
}