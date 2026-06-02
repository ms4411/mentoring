import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ error: "서버 JWT 설정이 누락되었습니다." });
  }

  if (username !== "admin" || password !== "1234") {
    return res.status(401).json({ error: "아이디나 비밀번호가 틀렸습니다." });
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });

  res.cookie("club_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000
  });

  return res.status(200).json({ message: "로그인 성공!" });
});

router.get("/me", (req, res) => {
  const token = req.cookies.club_token;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  try {
    const user = jwt.verify(token, jwtSecret);
    return res.status(200).json({ user });
  } catch {
    return res.status(401).json({ error: "로그인이 만료되었거나 유효하지 않습니다." });
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("club_token");
  return res.status(200).json({ message: "로그아웃 완료!" });
});

export default router;
