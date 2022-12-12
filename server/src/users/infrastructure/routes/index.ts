import express from "express";
import UserControllers from "../controllers";

const router = express.Router();

router.get("/", UserControllers.getAllUsers);
router.get("/:id", UserControllers.getUserById);

router.put("/:id", UserControllers.modifyUser);

router.delete("/:id", UserControllers.deleteUser);

export default router;