import { LogRepository } from '../domain/repositories/log.repository';
import { CheckService } from '../domain/use-cases/checks/check.service';
import { SendLogsEmail } from '../domain/use-cases/email/send-logs-email';
import { FileSytemDataSource } from '../infraestructure/data-sources/file-system.data-source';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSytemDataSource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    const url = 'http://localhost:3000';
    const url2 = 'https://www.google.com';
    console.log('Server started.....');

    // new SendLogsEmail(emailService, fileSystemLogRepository).execute([
    //   'pedrolosasp@gmail.com',
    // ]);

    // CronService.createCron('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`CheckService use case ${url2} is ok`),
    //     (error) => console.error(error)
    //   ).execute(url2);
    // });
  }
}
