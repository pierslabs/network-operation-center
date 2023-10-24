import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeveritylevel } from '../../domain/entities/log.entity';

const prisma = new PrismaClient();

const severityMap = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgreLogsDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityMap[log.level];

    await prisma.logModel.create({
      data: {
        ...log,
        level,
      },
    });
  }
  async getLogs(severity: LogSeveritylevel): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: { level: severityMap[severity] },
    });
    return logs.map(LogEntity.fromObject);
  }
}
