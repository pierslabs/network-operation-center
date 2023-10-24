import { logModel } from '../../data/mongo/models/log.model';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeveritylevel } from '../../domain/entities/log.entity';

export class MongoLogoDatatSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await logModel.create(log);
    console.log('[infrastructure]:[data source] Log saved in Mongo', newLog.id);
  }

  async getLogs(level: LogSeveritylevel): Promise<LogEntity[]> {
    console.log(level);
    const logs = await logModel.find({ level });

    console.log(
      '[infrastructure]:[data source] Logs retrieved from Mongo',
      logs
    );

    return logs.map(LogEntity.fromObject);
  }
}
