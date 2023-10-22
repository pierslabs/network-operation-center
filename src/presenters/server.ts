import { LogSeveritylevel } from '../domain/entities/log.entity';
import { LogRepository } from '../domain/repositories/log.repository';
import { CheckService } from '../domain/use-cases/checks/check.service';
import { SendLogsEmail } from '../domain/use-cases/email/send-logs-email';
import { FileSytemDataSource } from '../infraestructure/data-sources/file-system.data-source';
import { MongoDatatSource } from '../infraestructure/data-sources/mongo.data-source';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImpl(
  new FileSytemDataSource()
  // new MongoDatatSource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    const url = 'http://localhost:3000';
    const url2 = 'https://www.google.com';
    console.log('Server started.....');

    // new SendLogsEmail(emailService, fileSystemLogRepository).execute([
    //   'pedrolosasp@gmail.com',
    // ]);

    const logs = await logRepository.getLogs(LogSeveritylevel.high);
    console.log(logs);

    CronService.createCron('*/5 * * * * *', () => {
      new CheckService(
        logRepository,
        () => console.log(`CheckService use case ${url2} is ok`),
        (error) => console.error(error)
      ).execute(url2);
    });
  }
}
