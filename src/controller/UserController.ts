import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import UserService from '../service/UserService';
import User from '../model/entity/User';
import ApiException from './exception/ApiException';
import ServiceException, { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class UserController {

  private service:UserService = new UserService();

  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  /*
   * Create a new user.
   *
   * @param req  the request.
   * @param res  the response.
   * @param nexàt the next filter.
   * @returns the created user.
   */
  public createUser(req: Request, res: Response, next: Next):void {
    logger.info('[UserController] Creating new user.');

    const user:User = new User();
    if (req.body && req.body.name) { // mapping directly because not enough time
      user.name = req.body.name;
    }

    this.service.createUser(user)
      .then(user => res.json(201, user))
      .catch((err:ServiceException) => res.json(err.status, new ApiException(err.message, err.cause)));
    }
}
