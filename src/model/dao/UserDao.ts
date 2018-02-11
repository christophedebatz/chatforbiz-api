import { Database } from '../Database';
import User from '../entity/User';

export const UserDao = {

  /**
   * Returns a user by its id.
   */
  getById(id:number):Promise<User> {
    return Database.getInstance()
    .then(async connection => {
      const userRepository = connection.getRepository(User);
      return await userRepository.findOneById(id);
    });
  },

  remove(user:User) {
    return Database.getInstance()
    .then(async connection => {
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
      const userRepository = connection.getRepository(User);
      return await userRepository.findOne({ token });
    });
  },

  /**
   * Remove and returns the users that expire now.
   */
  removeByExpirationDateBefore(now:Date):Promise<User[]> {
    return Database.getInstance()
      .then(async connection => {
        return await connection.getRepository(User)
          .createQueryBuilder()
          .delete()
          .from(User)
          .where('expirationDate <= :now', { now })
          .execute();
      });
  },

  /**
   * Saves and returns a new user.
   */
  saveUser(user:User):Promise<User> {
    return Database.getInstance()
      .then(async connection => {
        const userRepository = connection.getRepository(User);
        return await userRepository.save(user);
      });
  }

};
