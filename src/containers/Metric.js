// @flow
import { Map } from "immutable"
import Test from "./Test"

export type MetricType = {
	id: string,
	testIds: string | Array<string>,
	loggerIds: string | Array<string>,
}

export default class Metric {
	
	id: string
	testIds: Array<string>
	loggerIds: Array<string>
	
	constructor(opts: MetricType) {
		this.id = opts.id
		this.testIds = typeof opts.testIds === "string" ? [opts.testIds] : opts.testIds
		this.loggerIds = typeof opts.loggerIds === "string" ? [opts.loggerIds] : opts.loggerIds
	}
	
	getTests(tests: Map<string, Test>) {
		if (this.testIds.length === 0) {
			return tests
		}
		return this.testIds.map((testId: string) => tests.get(testId))
	}
	
	getLoggers(loggers: Map<string, Function>) {
		if (this.loggerIds.length === 0) {
			return loggers
		}
		return this.loggerIds.map((loggerId: string) => loggers.get(loggerId))
	}
}