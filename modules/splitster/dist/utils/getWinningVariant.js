"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
exports.getWinningVariant = (testConfig, seedNumber) => {
    const sortedEntries = R.compose(R.sortBy(R.nth(0)), // sort by id
    // sort by id
    v => Object.entries(v))(testConfig.variants);
    const ratioSum = R.compose(R.sum, R.map(entry => entry[1]))(sortedEntries);
    // Seed number (from interval [0, 1]) is interpolated to interval [0-ratio sum]
    let floater = seedNumber * ratioSum;
    const winningVariant = R.find(entry => {
        floater -= entry[1];
        return floater <= 0;
    }, sortedEntries);
    return winningVariant ? winningVariant[0] : testConfig.defaultVariant;
};
