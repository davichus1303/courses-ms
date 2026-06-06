import { Request, Response, NextFunction } from 'express';
import { LoggerHelper } from '../helpers/Logger.helper';

export class LoggerMiddleware {

    public logRequest(req: Request, res: Response, next: NextFunction): void {

        const startTime = Date.now();

        LoggerHelper.info(
            `REQUEST ${req.method} ${req.originalUrl}`
        );

        res.on('finish', () => {

            const duration = Date.now() - startTime;

            LoggerHelper.info(
                `RESPONSE ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`
            );
        });

        next();
    }
}