"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceErrorCodes = {
    USER_NOT_FOUND: { name: 'user.not.found', code: 404 },
    USER_CREATION_ERROR: { name: 'user.creation.error', code: 500 },
    USER_CREATION_DUPLICATE: { name: 'user.creation.duplicate', code: 409 },
    TOO_MANY_ITEMS: { name: 'too.many.items', code: 400 },
    EMPTY_INPUT: { name: 'user.create.empty', code: 400 },
    UNAUTHORIZED: { name: 'unauthorized', code: 401 },
    UNEXPECTED_ERROR: { name: 'unexpected.error', code: 500 },
};
class ServiceException {
    constructor(message = undefined, cause = undefined, status = undefined) {
        this.mMessage = 'An error occured.';
        this.mStatus = 500;
        if (message) {
            if (typeof message === 'object') {
                this.mMessage = message.name;
                this.mStatus = message.code;
                if (message.cause) {
                    this.mCause = message.cause;
                }
            }
            else {
                this.mMessage = message;
                this.mStatus = status;
            }
            this.mCause = cause;
        }
    }
    get status() {
        return this.mStatus;
    }
    get message() {
        return this.mMessage;
    }
    get cause() {
        return this.mCause;
    }
    set cause(cause) {
        this.mCause = cause;
    }
    static create(codeObject, cause) {
        const se = new ServiceException(codeObject);
        se.cause = cause;
        return se;
    }
}
exports.default = ServiceException;
//# sourceMappingURL=ServiceException.js.map