// @flow
import Random from "random-js"
import { Variant } from "../types"

export const getWinningVariant = (variants: Array<Variant>): Variant => {
	const ratioSum = variants.reduce((acc, variant) => {
		return acc + variant.ratio
	}, 0)
	
	let rand = Random.integer(0, ratioSum)(Random.engines.browserCrypto)
	
	return variants.find(variant => {
		rand -= variant.ratio
		
		return rand < 0
	})
}