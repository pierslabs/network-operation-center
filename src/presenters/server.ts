import { CronJob } from 'cron';
import { CronService } from './cron/cron.service';

export class Server {
  public static start() {
    CronService.createCron('*/5 * * * * *', () => {
      console.log('Cron job executed');
    });
  }
}
