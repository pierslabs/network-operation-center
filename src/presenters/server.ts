import { LogSeveritylevel } from '../domain/entities/log.entity';
import { LogRepository } from '../domain/repositories/log.repository';
import { CheckService } from '../domain/use-cases/checks/check.service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check.service-multiple';
import { SendLogsEmail } from '../domain/use-cases/email/send-logs-email';
import { FileSytemDataSource } from '../infraestructure/data-sources/file-system.data-source';
import { MongoLogoDatatSource } from '../infraestructure/data-sources/mongo-log.data-source';
import { PostgreLogsDataSource } from '../infraestructure/data-sources/postgre-log.data-source';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const FSLogRepository = new LogRepositoryImpl(new FileSytemDataSource());
const MongoLogRepository = new LogRepositoryImpl(new MongoLogoDatatSource());
const PostgreLogRepository = new LogRepositoryImpl(new PostgreLogsDataSource());

const emailService = new EmailService();

export class Server {
  public static async start() {
    const url = 'http://localhost:3000';
    const url2 = 'https://www.google.com';
    console.log('Server started.....');

    // new SendLogsEmail(emailService, fileSystemLogRepository).execute([
    //   'pedrolosasp@gmail.com',
    // ]);

    CronService.createCron('*/5 * * * * *', () => {
      new CheckServiceMultiple(
        [FSLogRepository, MongoLogRepository, PostgreLogRepository],
        () => console.log(`CheckService use case ${url2} is ok`),
        (error) => console.error(error)
      ).execute(url2);
    });
  }
}
