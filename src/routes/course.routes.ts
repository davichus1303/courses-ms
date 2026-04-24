import { Router } from "express";
import { CourseController } from "../controller/course.controller";

const router = Router();
const controller = new CourseController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/", controller.update);
router.delete("/", controller.delete);

export default router;
