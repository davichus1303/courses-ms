import { Router } from 'express';
import { CompanyController } from '../controller/Company.controller';
import { AuthMiddleware } from '../middleware/Auth.middleware';

const router = Router();
const companyController = new CompanyController();
const authMiddleware = new AuthMiddleware();

router.use(authMiddleware.verifyToken.bind(authMiddleware));

router.get("/", companyController.findAll);
router.post("/", companyController.create);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);

export default router;