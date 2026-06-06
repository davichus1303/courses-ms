import winston from 'winston';

export class LoggerHelper {

    private static readonly logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
                return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console()
        ]
    });

    public static info(message: string): void {
        this.logger.info(message);
    }

    public static error(message: string): void {
        this.logger.error(message);
    }

    public static warn(message: string): void {
        this.logger.warn(message);
    }
}