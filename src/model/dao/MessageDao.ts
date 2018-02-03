import { Database } from '../Database';
import Message from '../entity/Message';

export const MessageDao = {

  /**
   * Saves and returns a new message.
   */
  saveMessage(message:Message):Promise<Message> {
    return Database.getInstance()
      .then(async connection => {
        const messageRepository = connection.getRepository(Message);
        return await messageRepository.save(message);
      });
  }

};
