import * as scheduler from 'node-schedule';
import UserService from '../service/UserService';

export const inactiveUserCleaningJob = {

  doSchedule(interval?:string):void {
    if (!interval) interval = '*/10 * * * * *';
    const userService:UserService = new UserService();

    scheduler.scheduleJob(interval, ():void => {
      console.log('Looking for old users to remove.');
      userService.removeInactiveUsers()
        .then(users => users.forEach(console.log))
        .catch(err => console.log('Unable to remove old users, error=', err.message));
    });
  }

}
