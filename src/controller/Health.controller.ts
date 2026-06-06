import { Request, Response } from 'express';

export class HealthController {
    public health(req: Request, res: Response): void {
        res.status(200).json({ 
            status: 'ok',
            service: 'courses-ms',
            database: 'connected',
            timestamp: new Date().toISOString() 
        });
    }
}