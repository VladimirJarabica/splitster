// @flow

import { Record, List } from "immutable"

import { getWinningVariant } from "../tools/testTools"

export type Variant = {
	id: string,
	ratio: number,
}

export type TestOpts = {
	id: string,
	variants: List<Variant>,
	segments: ?List<Function>,
}

const TestRecord = Record({
	id: "",
	variants: new List(),
	segments: new List(),
	winner: null,
})

export default class Test extends TestRecord {
	
	id: string
	variants: List<Variant>
	segments: ?List<Function>
	winner: Variant
	
	constructor(opts: TestOpts) {
		const winner = getWinningVariant(opts.variants)
		super({ winner, ...opts})
	}
}