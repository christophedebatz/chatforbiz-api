import Message from '../entity/Message';

export default class MessageDto extends Message {

  error: string;

  constructor(message:Message|MessageDto) {
    super(message);
  }

};
