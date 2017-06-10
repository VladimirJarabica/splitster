// @flow

import { Record } from "immutable"

export type VariantOpts = {
	id: string,
	ratio: number,
}

const VarianttRecord = Record({
	id: "",
	ratio: null,
})

export default class Variant extends VarianttRecord {
	
	id: string
	ratio: number
	
	constructor(opts: VariantOpts) {
		super(opts)
	}
}