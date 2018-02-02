import * as restify from 'restify';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { logger } from '../service/logger';
import { UserDao } from '../model/dao/UserDao';
import User from '../model/entity/User';
import ServiceException, { ServiceErrorCodes } from './exception/ServiceException';

export default class UserService {

  /*
   * Create a new user with constistancy checks before.
   *
   * @param user the user to store.
   * @returns the created user.
   */
   public createUser(user:User):Promise<User> {
    if (user && user.name) {
      return UserDao.getByName(user.name)
        .then(dbUser => {
          if (dbUser) {
            throw new ServiceException(ServiceErrorCodes.USER_CREATION_DUPLICATE);
          }
          user.token = uuid().replace('-', ''); // inject the user token before saving it
          user.expirationDate = moment().add(15, 'm').toDate(); // user is disconnected after 15 mn of inactivity
          return UserDao.createUser(user);
        });
    }
    return Promise.reject(
      new ServiceException(ServiceErrorCodes.EMPTY_INPUT)
    );
  }

}
