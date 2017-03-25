/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__splitster__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Test__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = {
	init: __WEBPACK_IMPORTED_MODULE_0__splitster__["a" /* init */],
	registerTest: __WEBPACK_IMPORTED_MODULE_0__splitster__["b" /* registerTest */],
	Test: __WEBPACK_IMPORTED_MODULE_1__Test__["a" /* default */],
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Test {
	constructor(opts) {
		console.log("new Test", opts)
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Test;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const init = () => {}
/* harmony export (immutable) */ __webpack_exports__["a"] = init;


const registerTest = () => {}
/* harmony export (immutable) */ __webpack_exports__["b"] = registerTest;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_main__ = __webpack_require__(0);
/**
 * Desired usage of app
 */


// const splitster = {}
__WEBPACK_IMPORTED_MODULE_0__src_main__["a" /* default */].init()

/**
 * Creates new abTest with ratio 3:3:5 - if not used, equal ratio will be used
 * TODO: segments => filter functions
 */
const newTest = new __WEBPACK_IMPORTED_MODULE_0__src_main__["Test"]({
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

/***/ })
/******/ ]);