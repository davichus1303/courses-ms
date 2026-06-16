import { Router } from "express";
import { UserController } from "../controller/User.controller";
import { AuthMiddleware } from "../middleware/Auth.middleware";

const router = Router();
const controller = new UserController();
const authMiddleware = new AuthMiddleware();

//Public routes
router.post("/", controller.createUsers);

//Protected routes
router.use(authMiddleware.verifyToken.bind(authMiddleware));
router.get("/", controller.getUsers);
router.put("/:userId", controller.updateUser);
router.delete("/:userId", controller.deleteUser);

export default router;
