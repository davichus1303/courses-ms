import { Router } from "express";
import { RoleController } from "../controller/Role.controller";
import { AuthMiddleware } from "../middleware/Auth.middleware";

const router = Router();
const controller = new RoleController();
const authMiddleware = new AuthMiddleware();

// Public routes
router.get("/simple-active", controller.findAllActiveSimpleRoles);

// Protected routes
router.use(authMiddleware.verifyToken.bind(authMiddleware));
router.post("/", controller.create);
router.get("/", controller.find);
router.put("/", controller.update);
router.delete("/", controller.delete);

export default router;