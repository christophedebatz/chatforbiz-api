import { logger } from '../../service/logger';
import { Database } from '../Database';
import Message from '../entity/Message';

export const MessageDao = {

  /**
   * Saves and returns a new message.
   */
  saveMessage(message:Message):Promise<Message> {
    return Database.getInstance()
      .then(async connection => {
        logger.info('Saving new message...');
        const messageRepository = connection.getRepository(Message);
        return await messageRepository.save(message);
      });
  },

  /**
   * Returns the given number of previous messages.
   */
  getLastMessages(count:number):Promise<Message[]> {
    return Database.getInstance()
      .then(async connection => {
        logger.info('Retrieving last ' + count + ' messages...')
        const messageRepository = connection.getRepository(Message);
        return await messageRepository.createQueryBuilder('message')
          .leftJoinAndSelect('message.user', 'user')
          .orderBy('message.id', 'ASC')
          .limit(count)
          .getMany();
      })
      .catch(err => {
        console.log(err);
        return [];
      });
  }

};
