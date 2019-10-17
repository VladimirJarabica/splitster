"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../records/Config");
const getTestsResults_1 = require("../utils/getTestsResults");
class SplitsterClient {
    constructor({ isSimple = true, config, user = {}, userId }) {
        this.results = {};
        this.config = null;
        this.user = null;
        this.userId = null;
        const realConfig = Config_1.getConfig(config);
        if (!isSimple) {
            this.config = realConfig;
            this.user = user;
            this.userId = userId;
        }
        this.results = getTestsResults_1.getTestsResults(realConfig, userId);
    }
    get(testId) {
        if (!this.results[testId]) {
            console.warn(`Splitster: Trying to access not existing test: ${testId}, your value will be null.`);
            return { disabled: false, disabledReason: null, value: null };
        }
        return this.results[testId];
    }
}
exports.SplitsterClient = SplitsterClient;
