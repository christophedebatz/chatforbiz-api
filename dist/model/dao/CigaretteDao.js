"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../Database");
const Cigarette_1 = require("../entity/Cigarette");
exports.CigaretteDao = {
    getUserCigarettes(userFbId, from, to) {
        return Database_1.Database.getInstance()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const qb = yield connection.getRepository(Cigarette_1.default)
                .createQueryBuilder('c')
                .innerJoin('c.user', 'user')
                .where('user.fbId = :userFbId', { userFbId });
            if (from) {
                qb.andWhere('creationDate > :from', { from });
            }
            if (to) {
                qb.andWhere('creationDate < :to', { to });
            }
            return qb.getMany();
        }));
    },
    addCigarettes(cigarettes) {
        return Database_1.Database.getInstance()
            .then((connection) => __awaiter(this, void 0, void 0, function* () { return yield connection.getRepository(Cigarette_1.default).save(cigarettes); }));
    }
};
//# sourceMappingURL=CigaretteDao.js.map