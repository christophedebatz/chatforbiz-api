"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = require("../model/dao/UserDao");
const ServiceException_1 = require("./exception/ServiceException");
class UserService {
    /*
     * Create a new user with constistancy checks before.
     *
     * @param user the user to store.
     * @returns the created user.
     */
    createUser(user) {
        if (user && user.email && user.fbId && user.fbAccessToken) {
            return UserDao_1.UserDao.getByEmailAndFbId(user.email, user.fbId)
                .then(dbUser => {
                if (dbUser) {
                    throw new ServiceException_1.default(ServiceException_1.ServiceErrorCodes.USER_CREATION_DUPLICATE);
                }
                return UserDao_1.UserDao.createUser(user);
            });
        }
        return Promise.reject(new ServiceException_1.default(ServiceException_1.ServiceErrorCodes.EMPTY_INPUT));
    }
    /*
     * Update given user-id with constistancy checks before.
     *
     * @param user the user update request dto.
     * @returns the updated user.
     */
    updateUser(user, userFbId) {
        if (userFbId) {
            return UserDao_1.UserDao.getByEmailAndFbId(user.email, userFbId)
                .then(dbUser => {
                if (!dbUser) {
                    throw new ServiceException_1.default(ServiceException_1.ServiceErrorCodes.USER_NOT_FOUND);
                }
                let userToSave = UserService.getUpdatedUserToSave(dbUser, user);
                return UserDao_1.UserDao.updateUser(userToSave, dbUser.id);
            });
        }
        return Promise.reject(new ServiceException_1.default(ServiceException_1.ServiceErrorCodes.EMPTY_INPUT));
    }
    /*
     * Authenticate user.
     *
     * @param userFbId the user fb id.
     * @param userFbAccessToken the user fb access token.
     * @returns the user.
     */
    authenticateUser(userFbId, userFbAccessToken) {
        // console.log('userFbId=', userFbId, ', userFbAccessToken=', userFbAccessToken);
        return UserDao_1.UserDao.getByFbIdAndAccessToken(userFbId, userFbAccessToken)
            .then(user => {
            if (user)
                return user;
            throw new ServiceException_1.default(ServiceException_1.ServiceErrorCodes.UNAUTHORIZED);
        });
    }
    getUserByFbId(userFbId) {
        if (userFbId) {
            return UserDao_1.UserDao.getByFbId(userFbId)
                .catch(err => {
                console.log('Error while fetching user by fbId.', err);
                throw new ServiceException_1.default(ServiceException_1.ServiceErrorCodes.USER_NOT_FOUND, err.message);
            });
        }
        return Promise.reject(new ServiceException_1.default(ServiceException_1.ServiceErrorCodes.USER_NOT_FOUND));
    }
    static getUpdatedUserToSave(dbUser, updatedUser) {
        if (updatedUser.email !== dbUser.email) {
            dbUser.email = updatedUser.email;
        }
        if (updatedUser.fbAccessToken !== dbUser.fbAccessToken) {
            dbUser.fbAccessToken = updatedUser.fbAccessToken;
        }
        if (updatedUser.fbAccessTokenExpirationDate !== dbUser.fbAccessTokenExpirationDate) {
            dbUser.fbAccessTokenExpirationDate = updatedUser.fbAccessTokenExpirationDate;
        }
        if (updatedUser.firstName !== dbUser.firstName) {
            dbUser.firstName = updatedUser.firstName;
        }
        if (updatedUser.lastName !== dbUser.lastName) {
            dbUser.lastName = updatedUser.lastName;
        }
        if (updatedUser.pictureUrl !== dbUser.pictureUrl) {
            dbUser.pictureUrl = updatedUser.pictureUrl;
        }
        return dbUser;
    }
}
exports.default = UserService;
