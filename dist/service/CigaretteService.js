"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CigaretteDao_1 = require("../model/dao/CigaretteDao");
const ServiceException_1 = require("./exception/ServiceException");
const moment = require("moment");
class CigaretteService {
    /*
     * Returns the user cigarettes for a period.
     *
     * @param userFbId the user facebook id.
     * @returns the user cigarettes.
     */
    getUserCigarettes(userFbId, from, to) {
        const duration = moment.duration(moment(to).diff(moment(from))).asDays();
        if (duration > CigaretteService.MAX_DAYS_QUERY) {
            throw ServiceException_1.default.create(ServiceException_1.ServiceErrorCodes.INVALID_INPUT_RANGE, `You can fetch a maximum of ${CigaretteService.MAX_DAYS_QUERY} day(s) of data.`);
        }
        return CigaretteDao_1.CigaretteDao.getUserCigarettes(userFbId, from, to);
    }
    /*
     * Save a collection of new cigarettes.
     *
     * @param cigarettes the cigarettes to save.
     * @returns the saved cigarettes.
     */
    addCigarettes(cigarettes) {
        const maxItems = CigaretteService.MAX_ITEMS_COMMAND;
        if (cigarettes.length > maxItems) {
            throw ServiceException_1.default.create(ServiceException_1.ServiceErrorCodes.TOO_MANY_ITEMS, `You can push maximum ${maxItems} items per request.`);
        }
        return CigaretteDao_1.CigaretteDao.addCigarettes(cigarettes);
    }
}
CigaretteService.MAX_DAYS_QUERY = 10;
CigaretteService.MAX_ITEMS_COMMAND = 500;
exports.default = CigaretteService;
