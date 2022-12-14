import express from "express";
import UserControllers from "../controllers";
import multer from "multer";
const upload = multer({ dest: "./assets/images" })

const router = express.Router();

router.get("/", UserControllers.getAllUsers);
router.get("/:id", UserControllers.getUserById);

router.post("/:userid/image", upload.single('avatar'), UserControllers.postUserImage);
router.get("/:userid/image", UserControllers.getUserImage);

router.put("/:id", UserControllers.modifyUser);

router.delete("/:id", UserControllers.deleteUser);

export default router;