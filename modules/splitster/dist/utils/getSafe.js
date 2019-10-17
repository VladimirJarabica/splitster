"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSafe = (fn) => {
    try {
        return fn();
    }
    catch (_) {
        return null;
    }
};
