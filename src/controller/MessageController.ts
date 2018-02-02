import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import MessageService from '../service/MessageService';
import User from '../model/entity/User';
import ApiException from './exception/ApiException';
import ServiceException, { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class MessageController {

  private service:MessageService = new MessageService();

  constructor() {
    // still empty yet dude
  }

}
