"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTestResult_1 = require("./getTestResult");
exports.getTestsResults = (config, userId) => {
    const entries = Object.entries(config.tests);
    const resultsEntries = entries.map(([id, testConfig]) => [id, getTestResult_1.getTestResult({ testConfig, userId })]);
    return Object.fromEntries(resultsEntries);
};
