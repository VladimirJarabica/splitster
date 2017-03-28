
// Just for immutable types run in console
import * as Immutable from "immutable"
import installDevTools from "immutable-devtools"
installDevTools(Immutable)

import Cookies from "js-cookie"

/**
 * Desired usage of app
 */

import splitster, { Test } from "../../src/main"

splitster.init()

/**
 * Creates new abTest with ratio 3:3:5 - if not used, equal ratio will be used
 * TODO: segments => filter functions
 */
const newTestOpts = {
	id: "button-color",
	variants: [
		{
			id: "red",
			ratio: 3,
		},
		{
			id: "green",
			ratio: 3,
		},
		{
			id: "blue",
			ratio: 5,
		},
	],
}
const newTest = new Test(newTestOpts)

splitster.registerTest(newTest)

splitster.registerLogger("console", (tests) => {
	tests.forEach((test) => {
		console.log(test)
	})
})

splitster.registerMetric("button-clicked", "button-color", "console")

document.getElementById("button").onclick = () => {
	splitster.fire("button-clicked")
	console.log("winner of button-color", splitster.getWinner("button-color"), splitster)
}

document.getElementById("erase-cookies").onclick = () => {
	const cookies = document.cookie.split(";")
	cookies.forEach(cookie => {
		Cookies.remove(cookie.split("=")[0].trim())
	})
}