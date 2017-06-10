// @flow
import { List } from "immutable"
import Random from "random-js"
import Variant from "../containers/Variant"

export const getWinningVariant = (variants: List<Variant>): Variant => {
	const ratioSum = variants.reduce((acc, variant) => {
		return acc + variant.ratio
	}, 0)
	
	let rand = Random.integer(0, ratioSum)(Random.engines.nativeMath)
	
	const winningVariant = variants.find(variant => {
		rand -= variant.ratio
		
		return rand < 0
	})
	
	return winningVariant || variants.first()
}