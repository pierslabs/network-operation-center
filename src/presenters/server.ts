import { CheckService } from '../domain/use-cases/checks/check.service';
import { FileSytemDataSource } from '../infraestructure/data-sources/file-system.data-source';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSytemDataSource()
);

export class Server {
  public static start() {
    const url = 'http://localhost:3000';
    const url2 = 'https://www.google.com';

    CronService.createCron('*/5 * * * * *', () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`CheckService use case ${url2} is ok`),
        (error) => console.error(error)
      ).execute(url2);
    });
  }
}
