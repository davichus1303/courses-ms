import { Router } from "express";
import { CourseController } from "../controller/course.controller";

const router = Router();
const controller = new CourseController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);

export default router;
