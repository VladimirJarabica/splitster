// @flow

export type MetricType = {
	id: string,
	testIds: string | Array<string>,
	loggerIds: string | Array<string>,
}

export default class Test {
	
	id: string
	testIds: Array<string>
	loggerIds: Array<string>
	
	constructor(opts: MetricType) {
		this.id = opts.id
		this.testIds = typeof opts.testIds === "string" ? [opts.testIds] : opts.testIds
		this.loggerIds = typeof opts.loggerIds === "string" ? [opts.loggerIds] : opts.loggerIds
	}
}