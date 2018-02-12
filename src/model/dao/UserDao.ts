import { logger } from '../service/logger';
import { Database } from '../Database';
import User from '../entity/User';

export const UserDao = {

  /**
   * Returns a user by its id.
   */
  getById(id:number):Promise<User> {
    return Database.getInstance()
    .then(async connection => {
      logger.info('Get user by id', id);
      const userRepository = connection.getRepository(User);
      return await userRepository.findOneById(id);
    });
  },

  /**
   * Remove the given user.
   */
  remove(user:User):Promise<void> {
    return Database.getInstance()
    .then(async connection => {
      logger.info('Remove user with id', user.id);
      const userRepository = connection.getRepository(User);
      return await userRepository.removeById(user.id);
    });
  },

  /**
   * Returns a user by its nickname.
   */
  getByName(name:string):Promise<User> {
    return Database.getInstance()
    .then(async connection => {
      logger.info('Get user by name', name);
      const userRepository = connection.getRepository(User);
      return await userRepository.findOne({ name });
    });
  },

  /**
   * Returns a user by its token.
   */
  getByToken(token:string):Promise<User> {
    return Database.getInstance()
    .then(async connection => {
      logger.info('Get user by token', token);
      const userRepository = connection.getRepository(User);
      return await userRepository.findOne({ token });
    });
  },

  /**
   * Remove and returns the users that have expired.
   */
  removeByExpirationDateBeforeNow():Promise<User[]> {
    return Database.getInstance()
      .then(async connection => {
        return await connection.getRepository(User)
          .createQueryBuilder()
          .delete()
          .from(User)
          .where('expirationDate <= NOW()')
          .execute();
      });
  },

  /**
   * Saves and returns a new user.
   */
  saveUser(user:User):Promise<User> {
    return Database.getInstance()
      .then(async connection => {
        logger.info('Save new user');
        const userRepository = connection.getRepository(User);
        return await userRepository.save(user);
      });
  }

};
