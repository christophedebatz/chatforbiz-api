"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../service/logger");
class UserAuthFilter {
    constructor() {
        this.authenticateUser = this.authenticateUser.bind(this);
    }
    /*
     * Authenticate the current user.
     *
     * @param req  the request.
     * @param res  the response.
     * @param next the next filter.
     * @returns the authenticated user.
     */
    authenticateUser(req, res, next) {
        // only the subcribe route have to be public
        if (req.method.toLowerCase() === 'post' && req.path().includes('/users')) {
            return next();
        }
        logger_1.logger.info('[UserController] Authenticating user.');
        let hasError = false;
        const authorization = req.header('Authorization');
        if (authorization) {
            const split = authorization.split('-');
            if (split.length === 2) {
                // todo
            }
            else {
                hasError = true;
            }
        }
        else {
            hasError = true;
        }
        if (hasError) {
            // todo
        }
    }
}
exports.default = UserAuthFilter;
//# sourceMappingURL=UserAuthFilter.js.map