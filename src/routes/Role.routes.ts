import { Router } from "express";
import { RoleController } from "../controller/Role.controller";

const router = Router();
const controller = new RoleController();

router.post("/", controller.create);
router.get("/", controller.find);
router.put("/", controller.update);
router.delete("/", controller.delete);

export default router;