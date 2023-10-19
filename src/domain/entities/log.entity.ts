export enum LogSeveritylevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
export class LogEntity {
  public level: LogSeveritylevel;
  public message: string;
  public timestamp: Date;

  constructor(level: LogSeveritylevel, message: string) {
    this.level = level;
    this.message = message;
    this.timestamp = new Date();
  }

  // Factory contructor
  static fromJson = (json: string): LogEntity => {
    const { level, message, timestamp } = JSON.parse(json);
    const log = new LogEntity(level, message);
    log.timestamp = new Date(timestamp);
    return log;
  };
}
