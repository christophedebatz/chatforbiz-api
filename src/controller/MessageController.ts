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
    return this.userService.authenticateUser(message.user.token)
      .then(user => {
        return this.messageService.post(message)
          .then(message => {
            return this.userService.prolongateTokenExpiration(user)
              .then(user => {
                message.user = user;
                return new MessageDto(message);
              });
          });
      })
      .catch(err => {
        console.log('Error while messaging...', message);
        message.error = 'unauthorized';
        return Promise.resolve(message);
      });
  }

  public onReceiveAction(action:ActionDto):Promise<ActionDto> {
    // do some job if necessary (save event on database or something else...)
    return new Promise((resolve, reject) => {
      if (!action.user.token) {
        action.error = 'unauthorized';
        return resolve(action);
      }
      return resolve(action);
    });
  }

}
