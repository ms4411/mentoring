import express from "express";
import { z } from "zod";
import { pool } from "../db.js"; // 위에서 만든 db.ts 불러오기

const router = express.Router();

const memberSchema = z.object({
  name: z.string().trim().min(1, "이름을 꼭 입력해주세요."),
  role: z.string().trim().min(1, "역할을 꼭 입력해주세요."),
});

// 1. 조회: 전체 부원 가져오기
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM members");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "DB 조회 실패" });
  }
});

// 2. 추가: 새 부원 저장
router.post("/", async (req, res) => {
  const parsed = memberSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "입력 형식 오류" });

  try {
    const { name, role } = parsed.data;
    // ?를 사용하여 데이터를 안전하게 주입 (SQL Injection 방지)
    await pool.query("INSERT INTO members (name, role) VALUES (?, ?)", [
      name,
      role,
    ]);
    res.status(201).json({ message: "부원 추가 완료!" });
  } catch (error) {
    res.status(500).json({ error: "DB 저장 실패" });
  }
});

// 3. 수정: 부원 정보 변경
router.put("/:id", async (req, res) => {
  const targetId = Number(req.params.id);
  const parsed = memberSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "입력 형식 오류" });

  try {
    const { name, role } = parsed.data;
    const [result]: any = await pool.query(
      "UPDATE members SET name = ?, role = ? WHERE id = ?",
      [name, role, targetId],
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "부원을 찾을 수 없습니다." });
    res.status(200).json({ message: "부원 정보 수정 완료!" });
  } catch (error) {
    res.status(500).json({ error: "DB 수정 실패" });
  }
});

// 4. 삭제: 부원 삭제
router.delete("/:id", async (req, res) => {
  const targetId = Number(req.params.id);
  try {
    const [result]: any = await pool.query("DELETE FROM members WHERE id = ?", [
      targetId,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "부원을 찾을 수 없습니다." });
    res.status(200).json({ message: "부원 삭제 완료!" });
  } catch (error) {
    res.status(500).json({ error: "DB 삭제 실패" });
  }
});

export default router;