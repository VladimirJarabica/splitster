/**
 * Desired usage of app
 */

import splitster, { Test } from "../../lib/main"

splitster.init()

/**
 * Creates new abTest with ratio 3:3:5 - if not used, equal ratio will be used
 * TODO: segments => filter functions
 */
const newTest = new Test({
	id: "button-color",
	variants: {
		"red": {
			ratio: 3,
		},
		"green": {
			ratio: 3,
		},
		"blue": {
			ratio: 5,
		}
	},
})

// splitster.registerTest(newTest)
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