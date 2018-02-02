import { Request, Response, Next } from 'restify';
import { logger } from '../service/logger';
import User from '../model/entity/User';

export default class UserAuthFilter {


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
    logger.info('[UserController] Authenticating user.');

    let hasError = false;
    const authorization = req.header('Authorization');
    if (authorization) {
      const split = authorization.split('-');
      if (split.length === 2) {
        // todo
      } else {
        hasError = true;
      }
    } else {
      hasError = true;
    }

    if (hasError) {
      // todo
    }
  }

}
