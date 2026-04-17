import { Router } from 'express';
import { CompanyController } from '../controller/Company.controller';

const router = Router();
const companyController = new CompanyController();

router.get("/", companyController.findAll);
router.post("/", companyController.create);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);

export default router;