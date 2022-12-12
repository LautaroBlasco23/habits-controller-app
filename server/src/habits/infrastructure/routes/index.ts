import express, { Router } from "express";
import HabitControllers from "../controllers";

const router = express.Router();

// GET
router.get("/user/:userid", HabitControllers.getUserHabits);
router.get("/:id", HabitControllers.getHabitById);

// post
router.post("/", HabitControllers.createHabit);

// PUT
router.put("/:id", HabitControllers.modifyHabit);

// DELETE
router.delete("/:id", HabitControllers.deleteHabit);

export default router;