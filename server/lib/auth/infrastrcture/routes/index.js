"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = __importDefault(require("../controllers"));
router.post("/register", controllers_1.default.Register);
router.post("/login", controllers_1.default.Login);
exports.default = router;
