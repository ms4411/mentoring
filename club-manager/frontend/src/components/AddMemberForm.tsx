import { useState } from "react";

interface AddMemberFormProps {
  apiBaseUrl: string;
  onRefresh: () => void;
}

export default function AddMemberForm({ apiBaseUrl, onRefresh }: AddMemberFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !role.trim()) {
      setError("이름과 역할을 모두 입력해주세요.");
      return;
    }

    const response = await fetch(`${apiBaseUrl}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role }),
      credentials: "include"
    });

    if (response.ok) {
      setName("");
      setRole("");
      onRefresh();
      return;
    }

    setError("추가 실패. 로그인 상태 또는 입력값을 확인해주세요.");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="역할 입력" value={role} onChange={(e) => setRole(e.target.value)} />
      <button type="submit">추가</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
