import { logger } from '../service/logger';
import * as scheduler from 'node-schedule';
import UserService from '../service/UserService';

export const inactiveUserCleaningJob = {

  doSchedule(interval?:string):void {
    if (!interval) interval = '*/10 * * * * *'; // every 10 seconds
    const userService:UserService = new UserService();

    scheduler.scheduleJob(interval, ():void => {
      logger.info('Looking for old users to remove.');
      userService.removeInactiveUsers()
        .then(users => {
          const removedCount = users.length;
          if (removedCount > 0) {
            logger.info(`${removedCount} users has been successfully removed.`);
          }
        })
        .catch(err => logger.error('Unable to remove old users.', err.message));
    });
  }

}
