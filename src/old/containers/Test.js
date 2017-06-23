import { Record, List } from "immutable"

import Variant from "./Variant"
import { getWinningVariant } from "../tools/testTools"

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
		// TODO: Check cookies

		// TODO: Check from server

		// TODO: Check winner variant

		const variants = List(opts.variants.map(v => new Variant(v)))
		// const winner = getWinningVariant(variants)
		super({
			id: opts.id,
			// winner,
			variants,
			segments: opts.segments,
		})
	}

	run() {
		if (!this.winner) {
			return this.set("winner", getWinningVariant(this.variants))
		}
		// Test has already run
		return this
	}
}