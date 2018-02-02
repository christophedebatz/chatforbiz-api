"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const logger_1 = require("../service/logger");
const CigaretteService_1 = require("../service/CigaretteService");
const UserService_1 = require("../service/UserService");
const CigaretteMapper_1 = require("../model/mapper/CigaretteMapper");
const ApiException_1 = require("./exception/ApiException");
const ServiceException_1 = require("../service/exception/ServiceException");
class CigaretteController {
    constructor() {
        this.cigaretteService = new CigaretteService_1.default();
        this.userService = new UserService_1.default();
        this.getUserCigarettes = this.getUserCigarettes.bind(this);
        this.addCigarettes = this.addCigarettes.bind(this);
    }
    /*
     * Returns the user cigarettes for a period.
     *
     * @param req  the request.
     * @param res  the response.
     * @param next the next filter.
     * @returns the suer cigarettes.
     */
    getUserCigarettes(req, res, next) {
        logger_1.logger.info(`[CigaretteController] Fetching user id = ${res.get('userFbId')} cigarettes.`);
        const userFbId = res.get('userFbId');
        if (!userFbId) {
            throw ApiException_1.default.fromServiceCode(ServiceException_1.ServiceErrorCodes.USER_NOT_FOUND);
        }
        const fromDate = (req.query.from) ? moment(req.query.from).toDate() : undefined;
        const toDate = (req.query.to) ? moment(req.query.to).toDate() : undefined;
        this.cigaretteService.getUserCigarettes(userFbId, fromDate, toDate)
            .then(cigarettes => res.json(200, cigarettes))
            .catch(err => res.json(err.status, new ApiException_1.default(err.message, err.cause)));
    }
    /*
     * Save a collection of new cigarettes.
     *
     * @param req  the request.
     * @param res  the response.
     * @param next the next filter.
     * @returns the saved cigarettes.
     */
    addCigarettes(req, res, next) {
        logger_1.logger.info(`[CigaretteController] Smoking for user id = ${res.get('userFbId')}.`);
        const userFbId = res.get('userFbId');
        if (!userFbId) {
            throw ApiException_1.default.fromServiceCode(ServiceException_1.ServiceErrorCodes.USER_NOT_FOUND);
        }
        this.userService.getUserByFbId(userFbId)
            .then((user) => CigaretteMapper_1.default.mapMany(user, req))
            .then((cigarettes) => { console.log('cig=', JSON.stringify(cigarettes)); return cigarettes; })
            .then((cigarettes) => this.cigaretteService.addCigarettes(cigarettes))
            .then(() => res.send(204))
            .catch(err => res.json(err.status, new ApiException_1.default(err.message, err.cause)));
    }
}
exports.default = CigaretteController;
