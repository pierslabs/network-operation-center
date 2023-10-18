import { CheckService } from '../domain/use-cases/checks/check.service';
import { CronService } from './cron/cron.service';

export class Server {
  public static start() {
    const url = 'http://localhost:3000';

    CronService.createCron('*/5 * * * * *', () => {
      new CheckService(
        () => console.log(`CheckService use case ${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
