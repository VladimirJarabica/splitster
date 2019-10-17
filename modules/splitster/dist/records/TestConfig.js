"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestConfig = (id, inputTestConfig) => ({
    id,
    version: inputTestConfig.version || 0,
    description: inputTestConfig.description || "",
    defaultVariant: inputTestConfig.defaultVariant,
    variants: inputTestConfig.variants,
    usage: inputTestConfig.usage || null,
    disabled: inputTestConfig.disabled || false
});
