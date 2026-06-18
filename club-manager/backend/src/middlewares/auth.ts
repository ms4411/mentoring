import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.club_token; //쿠키 중에서 특정 토큰의 값을 받아와라
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) { //토큰이 없다-> 로그인 필요
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  if (!jwtSecret) { //비번이 없는디?
    return res.status(500).json({ error: "서버 JWT 설정이 누락되었습니다." });
  }

  try {
    const user = jwt.verify(token, jwtSecret); //비번 맞는 놈?
    res.locals.user = user;
    return next();
  } catch {
    return res.status(401).json({ error: "로그인이 만료되었거나 유효하지 않습니다." });
  }
}
