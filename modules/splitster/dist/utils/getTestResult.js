"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seedRandom = require("seedrandom");
const random_js_1 = require("random-js");
const getWinningVariant_1 = require("./getWinningVariant");
exports.getSeedNumber = (key) => seedRandom(key)();
const getOverride = (testConfig, override) => {
    if (override[`${testConfig.id}_${testConfig.version}`]) {
        return override[`${testConfig.id}_${testConfig.version}`];
    }
    if (override[testConfig.id]) {
        return override[testConfig.id];
    }
    return null;
};
const DISABLED_REGEX = /^(__disabled_)(\w+)$/;
exports.getTestResult = ({ testConfig, userId, override = {} }) => {
    const overrideValue = getOverride(testConfig, override);
    if (overrideValue) {
        const regexResult = overrideValue.match(DISABLED_REGEX);
        if (regexResult && regexResult[1] === "__disabled") {
            return {
                disabled: true,
                disabledReason: regexResult[2],
                value: testConfig.defaultVariant
            };
        }
    }
    if (testConfig.disabled) {
        return {
            disabled: true,
            disabledReason: "dev",
            value: testConfig.defaultVariant
        };
    }
    // TODO: user groups
    if (testConfig.usage !== null) {
        const rand = random_js_1.integer(0, 99)(random_js_1.nativeMath);
        if (rand >= testConfig.usage) {
            return {
                disabled: true,
                disabledReason: "usage",
                value: testConfig.defaultVariant
            };
        }
    }
    const seedNumber = exports.getSeedNumber(`${testConfig.id}_${testConfig.version}:${userId}`);
    return {
        disabled: false,
        disabledReason: null,
        value: getWinningVariant_1.getWinningVariant(testConfig, seedNumber)
    };
};
