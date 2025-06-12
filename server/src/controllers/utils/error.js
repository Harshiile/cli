"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIError = void 0;
class CLIError extends Error {
    constructor(code, message) {
        super(message);
        this.statusCode = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CLIError = CLIError;
