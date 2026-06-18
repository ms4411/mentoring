import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import membersRouter from "./routes/members.js";
import { authMiddleware } from "./middlewares/auth.js";

dotenv.config(); //환경변수 들고 오기

const app = express();
const port = Number(process.env.PORT) || 8080;
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"]; //해당 포트로 들어오는 요청 허락

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin is not allowed."));
    },
    credentials: true, //쿠키 허용
  }),
);
app.use(express.json()); //json 요청 본문 파싱
app.use(cookieParser()); //쿠키 파싱

app.use("/api/auth", authRouter); //인가가 없는 링크
app.use("/api/members", authMiddleware, membersRouter); //인가가 추가되어 있는 링크

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

app.listen(port, () => { //백앤드 서버 실행 포트 출력
  console.log(`백엔드 서버 가동 중! 잘 돌아가고 있습니다요~!: http://localhost:${port}`);
});
