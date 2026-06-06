import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/Auth.service';

export class AuthController {

    private readonly authService = new AuthService();

    /**
     * @description Login user
     * @param {Request} req Request object
     * @param {Response} res Response object
     * @returns Token
     */
    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            const token = await this.authService.login(
                req.body
            );
            res.status(200).json({
                accessToken: token
            });
        } catch (error: any) {
            next(error);
        }
    };
}
