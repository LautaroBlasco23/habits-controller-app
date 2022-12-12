"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("../controllers"));
const router = express_1.default.Router();
// GET
router.get("/user/:userid", controllers_1.default.getUserHabits);
router.get("/:id", controllers_1.default.getHabitById);
// post
router.post("/", controllers_1.default.createHabit);
// PUT
router.put("/:id", controllers_1.default.modifyHabit);
// DELETE
router.delete("/:id", controllers_1.default.deleteHabit);
exports.default = router;
