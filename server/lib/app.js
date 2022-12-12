"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./auth/infrastructure/routes"));
const routes_2 = __importDefault(require("./users/infrastructure/routes"));
const routes_3 = __importDefault(require("./habits/infrastructure/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", routes_1.default);
app.use("/api/users", routes_2.default);
app.use("/api/habits", routes_3.default);
app.listen(process.env.PORT, () => {
    console.log("server running on port:", process.env.PORT);
});
