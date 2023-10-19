import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeveritylevel } from '../../domain/entities/log.entity';
import fs from 'fs';

export class FileSytemDataSource implements LogDataSource {
  private readonly logPath = 'logs';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  contructor() {
    this.createLogsfiles();
  }

  private createLogsfiles = () => {
    console.log('entrando a crear logs');
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) return;
        fs.writeFileSync(path, '');
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    console.log('Data fil system', this.allLogsPath);
    fs.appendFileSync(this.allLogsPath, logAsJson);

    switch (newLog.level) {
      case LogSeveritylevel.low:
        return;
      case LogSeveritylevel.medium:
        fs.appendFileSync(this.mediumLogsPath, logAsJson);

      case LogSeveritylevel.high:
        fs.appendFileSync(this.highLogsPath, logAsJson);

      default:
        break;
    }
  }

  async getLogs(severity: LogSeveritylevel): Promise<LogEntity[]> {
    switch (severity) {
      case LogSeveritylevel.low:
        return Promise.resolve(this.getLogsFromFile(this.allLogsPath));
      case LogSeveritylevel.medium:
        return Promise.resolve(this.getLogsFromFile(this.mediumLogsPath));
      case LogSeveritylevel.high:
        return Promise.resolve(this.getLogsFromFile(this.highLogsPath));
      default:
        break;
    }
    throw new Error('Method not implemented.');
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');

    const logs = content.split('\n').map(LogEntity.fromJson);

    return logs;
  };
}
