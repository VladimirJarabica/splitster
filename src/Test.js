// @flow

export type Variant = {
	id: string,
	radio: number,
}

export type TestOpts = {
	id: string,
	variants: Array<Variant>,
	segments: ?Array<Function>
}

export default class Test {
	id: string
	
	constructor(opts: TestOpts) {
		this.id = opts.id
		console.log("new Test", opts)
	}
}