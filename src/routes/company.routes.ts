import { Router } from 'express';
import { CompanyController } from '../controller/Company.controller';
import { AuthMiddleware } from '../middleware/Auth.middleware';

const router = Router();
const companyController = new CompanyController();
const authMiddleware = new AuthMiddleware();
// Public routes
router.get("/simple-active", companyController.getSimpleActiveCompany);
// Protected routes
router.use(authMiddleware.verifyToken.bind(authMiddleware));
router.get("/", companyController.findAll);
router.post("/", companyController.create);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);

export default router;