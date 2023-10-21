import { EmailService } from '../../../presenters/email/email.service';
import { LogEntity, LogSeveritylevel } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

export interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendLogsEmail implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const send = this.emailService.sendEmailWithFileSystemLogs(to);
      if (!send) throw new Error('Error sending email');

      const log = new LogEntity({
        level: LogSeveritylevel.low,
        message: `Error sending email to ${to}`,
        origin: 'SendLogsEmailUseCase',
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      console.error(error);
      const log = new LogEntity({
        level: LogSeveritylevel.high,
        message: `Error sending email to ${to}, Error: ${error}`,
        origin: 'SendLogsEmailUseCase',
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
