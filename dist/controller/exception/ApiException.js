"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiException {
    constructor(error, cause = undefined) {
        this.error = undefined;
        this.error = error;
        this.cause = cause;
        if (this.error) {
            this.hasError = true;
        }
    }
    static fromServiceCode(code) {
        return new ApiException(code.name);
    }
}
exports.default = ApiException;
