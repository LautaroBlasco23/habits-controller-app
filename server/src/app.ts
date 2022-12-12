import express from "express";
import "dotenv/config";
import authRouter from "./auth/infrastructure/routes";
import userRouter from "./users/infrastructure/routes";
import habitRouter from './habits/infrastructure/routes';

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/habits", habitRouter);

app.listen(process.env.PORT, () => {
    console.log("server running on port:", process.env.PORT);
});