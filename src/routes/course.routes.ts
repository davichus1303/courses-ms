import { Router } from "express";
import { CourseController } from "../controller/course.controller";
import { AuthMiddleware } from "../middleware/Auth.middleware";

const router = Router();
const controller = new CourseController();
const authMiddleware = new AuthMiddleware();

router.use(authMiddleware.verifyToken.bind(authMiddleware));

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/", controller.update);
router.delete("/", controller.delete);

export default router;
