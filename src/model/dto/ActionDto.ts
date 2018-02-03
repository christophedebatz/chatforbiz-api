import User from '../entity/User';

export default class ActionDto {

  type: ActionType;

  user: User;

};

class ActionType {

  TYPING: 'typing';

  LEAVING: 'leaving';

  JOINING: 'joining';

};
