import { Router } from 'express';
import { HealthController } from '../controller/Health.controller';

const router = Router();
const healthController = new HealthController();

router.get('/', healthController.health);

export default router;