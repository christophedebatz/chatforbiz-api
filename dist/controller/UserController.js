"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../service/logger");
const UserService_1 = require("../service/UserService");
const UserMapper_1 = require("../model/mapper/UserMapper");
const ApiException_1 = require("./exception/ApiException");
const ServiceException_1 = require("../service/exception/ServiceException");
class UserController {
    constructor() {
        this.service = new UserService_1.default();
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    /*
     * Create a new user.
     *
     * @param req  the request.
     * @param res  the response.
     * @param next the next filter.
     * @returns the created user.
     */
    createUser(req, res, next) {
        logger_1.logger.info('[UserController] Creating new user.');
        const user = UserMapper_1.default.map(req);
        this.service.createUser(user)
            .then(user => res.json(201, user))
            .catch((err) => res.json(err.status, new ApiException_1.default(err.message, err.cause)));
    }
    /*
     * Update a user.
     *
     * @param req  the request.
     * @param res  the response.
     * @param next the next filter.
     * @returns the updated user.
     */
    updateUser(req, res, next) {
        const userFbId = res.get('userFbId');
        logger_1.logger.info(`[UserController] Updating current user (id = ${userFbId}).`);
        const user = UserMapper_1.default.map(req);
        this.service.updateUser(user, userFbId)
            .then(user => res.send(204))
            .catch((err) => res.json(err.status, new ApiException_1.default(err.message, err.cause)));
    }
    /*
     * Return the current user.
     *
     * @param req  the request.
     * @param res  the response.
     * @param next the next filter.
     * @returns the current user.
     */
    getUser(req, res, next) {
        const userFbId = res.get('userFbId');
        logger_1.logger.info(`[UserController] Fetching current user (id = ${userFbId}).`);
        if (!userFbId) {
            throw ApiException_1.default.fromServiceCode(ServiceException_1.ServiceErrorCodes.USER_NOT_FOUND);
        }
        this.service.getUserByFbId(userFbId)
            .then(user => res.json(200, user))
            .catch((err) => res.json(err.status, new ApiException_1.default(err.message, err.cause)));
    }
}
exports.default = UserController;
