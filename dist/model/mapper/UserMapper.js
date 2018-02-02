"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
class UserMapper {
    static map(request) {
        if (request.body) {
            const b = request.body;
            const user = new User_1.default();
            user.email = b.email;
            user.creationDate = new Date();
            user.updateDate = new Date();
            user.fbAccessToken = b.fbAccessToken;
            user.fbId = b.fbId;
            user.firstName = b.firstName;
            user.lastName = b.lastName;
            user.pictureUrl = b.pictureUrl;
            user.role = User_1.UserRole.USER;
            return user;
        }
        return null;
    }
}
exports.default = UserMapper;
