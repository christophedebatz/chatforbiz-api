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
const User_1 = require("../entity/User");
exports.UserDao = {
    /**
     * Returns a user by its id.
     */
    getById(id) {
        return Database_1.Database.getInstance()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = connection.getRepository(User_1.default);
            return yield userRepository.findOneById(id);
        }));
    },
    /**
     * Saves and returns a new user.
     */
    createUser(user) {
        return Database_1.Database.getInstance()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = connection.getRepository(User_1.default);
            return yield userRepository.save(user);
        }));
    }
};
//# sourceMappingURL=UserDao.js.map