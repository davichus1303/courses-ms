import { Router } from 'express';
import { AuthController } from '../controller/Auth.controller';

const router = Router();

const controller = new AuthController();

router.post(
    '/login',
    controller.login
);

export default router;