import User from '../entity/User';

export default class ActionDto {

  constructor(type:ActionType, user:User) {
    this.type = type;
    this.user = user;
    this.creationDate = new Date();
  }

  error: string;

  type: ActionType;

  creationDate: Date;

  user: User;

};

class ActionType {

  TYPING: 'typing';

  LEAVING: 'leaving';

  JOINING: 'joining';

};
