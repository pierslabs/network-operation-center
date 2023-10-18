import { CronCommand, CronJob } from 'cron';
import { DateTime } from 'luxon';

export class CronService {
  public static createCron(
    cronTime: string | Date | DateTime,
    onTick: CronCommand<null, false>
  ): CronJob {
    const job = new CronJob(cronTime, onTick);
    job.start();

    return job;
  }
}
