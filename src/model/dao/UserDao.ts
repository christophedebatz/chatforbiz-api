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

  /**
   * Returns a user by its nickname.
   */
  getByNickName(nickname:string):Promise<User> {
    return Database.getInstance()
    .then(async connection => {
      const userRepository = connection.getRepository(User);
      return await userRepository.findOne({ nickname });
    });
  },

  /**
   * Saves and returns a new user.
   */
  createUser(user:User):Promise<User> {
    return Database.getInstance()
      .then(async connection => {
        const userRepository = connection.getRepository(User);
        return await userRepository.save(user);
      });
  }

};
