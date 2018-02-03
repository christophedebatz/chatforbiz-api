import { Request, Response, Next } from 'restify';
import * as moment from 'moment';
import { logger } from '../service/logger';
import MessageService from '../service/MessageService';
import UserService from '../service/UserService';
import User from '../model/entity/User';
import MessageDto from '../model/dto/MessageDto';
import Message from '../model/entity/Message';
import ActionDto from '../model/dto/ActionDto';
import ApiException from './exception/ApiException';
import ServiceException, { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class MessageController {

  private messageService:MessageService = new MessageService();
  private userService:UserService = new UserService();

  constructor() {
    this.onReceiveMessage = this.onReceiveMessage.bind(this);
    this.onReceiveAction = this.onReceiveAction.bind(this);
  }

  public onReceiveMessage(message:MessageDto):Promise<MessageDto> {
    return this.messageService.post(message)
      .then(message => {
        return this.userService.prolongateTokenExpiration(message.user)
          .then(user => {
            message.user = user;
            return new Message(message);
          });
      });
  }

  public onReceiveAction(action:ActionDto):Promise<ActionDto> {
    return new Promise((resolve, reject) => {
      return null;
    });
  }

}
