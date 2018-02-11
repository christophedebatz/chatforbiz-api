import { Response } from 'restify';
import User from '../model/entity/User';
import ApiException from './exception/ApiException';
import { ServiceErrorCodes } from '../service/exception/ServiceException';

export default class MeController {

  protected tryGetMe(res:Response):User {
    if (res.get('me')) {
      return JSON.parse(res.get('me'));
    }
    throw ApiException.fromServiceCode(ServiceErrorCodes.UNAUTHORIZED);
  }

}
