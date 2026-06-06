import { Router } from "express";
import { UserController } from "../controller/User.controller";
import { AuthMiddleware } from "../middleware/Auth.middleware";

const router = Router();
const controller = new UserController();
const authMiddleware = new AuthMiddleware();

router.use(authMiddleware.verifyToken.bind(authMiddleware));

router.post("/", controller.createUsers);
router.get("/", controller.getUsers);
router.put("/:userId", controller.updateUser);
router.delete("/:userId", controller.deleteUser);

export default router;