import { Router } from "express";
import { UserController } from "../controller/User.controller";

const router = Router();
const controller = new UserController();

router.post("/", controller.createUsers);
router.get("/", controller.getUsers);
router.put("/:userId", controller.updateUser);
router.delete("/:userId", controller.deleteUser);

export default router;