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
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin is not allowed."));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/members", authMiddleware, membersRouter);

// 수정됨: 서버가 예상치 못한 에러로 꺼지는 것을 막는 글로벌 에러 핸들러
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "서버 내부에서 문제가 발생했습니다!" });
  },
);

app.listen(port, () => {
  console.log(`백엔드 서버 가동 중: http://localhost:${port}`);
});
