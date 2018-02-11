import Message from '../model/entity/Message';
import { MessageDao } from '../model/dao/MessageDao';

export default class MessageService {

  post(message:Message):Promise<Message> {
    message.name = message.user.name;
    return MessageDao.saveMessage(message);
  }

}
