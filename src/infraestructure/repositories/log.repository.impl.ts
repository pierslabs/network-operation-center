import { LogEntity, LogSeveritylevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repositories/log.repository';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogRepository) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }

  async getLogs(severity: LogSeveritylevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severity);
  }
}
