import { LogEntity, LogSeveritylevel } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface CheckServiceMultipleUseCase {
  execute: (url: string) => Promise<boolean>;
}

type SuccessCallback = () => void;

type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => logRepository.saveLog(log));
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on checkService use case ${url}`);
      }
      const log = new LogEntity({
        level: LogSeveritylevel.low,
        message: `CheckService use case ${url} is ok`,
        origin: 'check-service.ts',
      });

      this.callLogs(log);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `Error on checkService ${url}`;

      const log = new LogEntity({
        level: LogSeveritylevel.high,
        message: errorMessage,
        origin: 'check-service.ts',
      });

      this.callLogs(log);

      this.errorCallback(errorMessage);
      return false;
    }
  }
}
