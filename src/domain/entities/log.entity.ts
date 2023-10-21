export enum LogSeveritylevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface logEntityOptions {
  level: LogSeveritylevel;
  message: string;
  origin: string;
  timestamp?: Date;
}

export class LogEntity {
  public level: LogSeveritylevel;
  public message: string;
  public timestamp: Date;
  public origin: string;

  constructor({
    level,
    message,
    origin,
    timestamp = new Date(),
  }: logEntityOptions) {
    this.level = level;
    this.message = message;
    this.timestamp = timestamp;
    this.origin = origin;
  }

  // Factory contructor
  static fromJson = (json: string): LogEntity => {
    const { level, message, timestamp, origin } = JSON.parse(json);
    const log = new LogEntity({ level, message, origin, timestamp });
    log.timestamp = new Date(timestamp);
    return log;
  };
}
