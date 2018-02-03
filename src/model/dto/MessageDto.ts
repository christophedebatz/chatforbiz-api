import Message from '../entity/Message';

export default class MessageDto extends Message {

  constructor(message:Message|MessageDto) {
    super(message);
  }

}
