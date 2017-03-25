import { Record, Map } from "immutable"

import Test from "../containers/Test"

const SplisterStateRecord = Record({
	tests: Map(),
	loggers: Map(),
})

export default class SplitsterState extends SplisterStateRecord {
	
	tests: Map<Test>
	loggers: Map<Function>
	
	constructor() {
		console.log("initializing splitster state. Now should init by cookies, localstorage etc")
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
	
	// addMetric
}