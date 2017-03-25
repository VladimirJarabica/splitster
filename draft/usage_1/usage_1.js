// @flow

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
//
// splitster.registerLogger("console", (tests) => {
// 	tests.forEach(() => {
// 		console.log(test.toLog())
// 	})
// })
//
// document.getElementById("button").onclick = () => {
// 	// If not set, all test will be registered here
// 	splitster.registerMetric(["button-color"], ["console"])
// }