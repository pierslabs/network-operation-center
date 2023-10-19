import { LogEntity, LogSeveritylevel } from '../entities/log.entity';

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severity: LogSeveritylevel): Promise<LogEntity[]>;
}
