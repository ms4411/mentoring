import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import membersRouter from "./routes/members.js";
import { authMiddleware } from "./middlewares/auth.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/members", authMiddleware, membersRouter);

app.listen(port, () => {
  console.log(`백엔드 서버 가동 중: http://localhost:${port}`);
});
