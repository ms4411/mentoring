import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.club_token;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  if (!jwtSecret) {
    return res.status(500).json({ error: "서버 JWT 설정이 누락되었습니다." });
  }

  try {
    jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: "로그인이 만료되었거나 유효하지 않습니다." });
  }
}
