import User from '../entity/User';

export default class ActionDto {

  constructor(type:ActionType, user:User) {
    this.type = type;
    this.user = user;
  }

  error: string;

  type: ActionType;

  user: User;

};

class ActionType {

  TYPING: 'typing';

  LEAVING: 'leaving';

  JOINING: 'joining';

};
