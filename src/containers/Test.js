// @flow

import { Record, List } from "immutable"

export type Variant = {
	id: string,
	ratio: number,
}

export type TestOpts = {
	id: string,
	variants: List<Variant>,
	segments: ?List<Function>
}

const TestRecord = Record({
	id: "",
	variants: new List(),
	segments: new List(),
})

export default class Test extends TestRecord {
	
	id: string
	variants: List<Variant>
	segments: ?List<Function>
	
	constructor(opts: TestOpts) {
		super(opts)
		console.log("new Test", opts)
	}
}