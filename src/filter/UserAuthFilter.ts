import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import UserService from '../service/UserService';
import ApiException from '../controller/exception/ApiException';
import User from '../model/entity/User';

export default class UserAuthFilter {

  private service:UserService = new UserService();

  constructor() {
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  /*
   * Authenticate the current user.
   *
   * @param req  the request.
   * @param res  the response.
   * @param next the next filter.
   * @returns the authenticated user.
   */
  public authenticateUser(req: Request, res: Response, next: Next):void {
    // only the subcribe route have to be public
    if (req.method.toLowerCase() === 'post' && req.path().includes('/users')) {
      return next();
    }
    logger.info('[UserAuthFilter] Authenticating user.');
    this.service.authenticateUser(req.header('Authorization'))
      .then((user:User) => {
        res.set('me', JSON.stringify(user));
        next();
      })
      .catch(err => res.json(err.status, new ApiException(err.message, err.cause)));
  }
}
