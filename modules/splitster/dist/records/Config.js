"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestConfig_1 = require("./TestConfig");
const getSafe_1 = require("../utils/getSafe");
exports.getTestsConfig = (configTests) => {
    const entries = Object.entries(configTests);
    const mapped = entries.map(([id, inputTestConfig]) => [id, TestConfig_1.getTestConfig(id, inputTestConfig)]);
    return Object.fromEntries(mapped);
};
exports.getConfig = (inputConfig) => {
    const config = {
        tests: exports.getTestsConfig(inputConfig.tests),
        options: {
            cookies: {
                disabled: getSafe_1.getSafe(() => inputConfig.options.cookies.disabled) || false,
                expiration: getSafe_1.getSafe(() => inputConfig.options.cookies.expiration) || 30,
                name: getSafe_1.getSafe(() => inputConfig.options.cookies.name) || "splitster"
            }
        }
    };
    return config;
};
