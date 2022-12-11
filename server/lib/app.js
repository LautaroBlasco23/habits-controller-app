"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./auth/infrastrcture/routes"));
const app = (0, express_1.default)();
app.use("/api/auth", routes_1.default);
app.listen(process.env.PORT, () => {
    console.log("server running on port:", process.env.PORT);
});
