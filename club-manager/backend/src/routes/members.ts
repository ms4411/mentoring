import express from "express";
import { z } from "zod";

const router = express.Router();

interface Member {
  id: number;
  name: string;
  role: string;
}

let members: Member[] = [
  { id: 1, name: "김민수", role: "프론트엔드" },
  { id: 2, name: "이수진", role: "백엔드" }
];

const memberSchema = z.object({
  name: z.string().trim().min(1, "이름을 꼭 입력해주세요."),
  role: z.string().trim().min(1, "역할을 꼭 입력해주세요.")
});

router.get("/", (_req, res) => {
  return res.status(200).json(members);
});

router.post("/", (req, res) => {
  const parsed = memberSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "입력 형식이 잘못되었습니다." });
  }

  const newMember = { id: Date.now(), ...parsed.data };
  members.push(newMember);

  return res.status(201).json({ message: "부원 추가 완료!", member: newMember });
});

router.put("/:id", (req, res) => {
  const targetId = Number(req.params.id);
  const parsed = memberSchema.safeParse(req.body);

  if (!Number.isInteger(targetId)) {
    return res.status(400).json({ error: "잘못된 부원 ID입니다." });
  }

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "입력 형식이 잘못되었습니다." });
  }

  const memberExists = members.some((member) => member.id === targetId);

  if (!memberExists) {
    return res.status(404).json({ error: "부원을 찾을 수 없습니다." });
  }

  members = members.map((member) =>
    member.id === targetId ? { ...member, ...parsed.data } : member
  );

  return res.status(200).json({ message: "부원 정보 수정 완료!" });
});

router.delete("/:id", (req, res) => {
  const targetId = Number(req.params.id);

  if (!Number.isInteger(targetId)) {
    return res.status(400).json({ error: "잘못된 부원 ID입니다." });
  }

  const beforeCount = members.length;
  members = members.filter((member) => member.id !== targetId);

  if (members.length === beforeCount) {
    return res.status(404).json({ error: "부원을 찾을 수 없습니다." });
  }

  return res.status(200).json({ message: "부원 삭제 완료!" });
});

export default router;
