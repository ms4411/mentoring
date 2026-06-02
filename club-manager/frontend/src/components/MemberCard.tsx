import { useState } from "react";
import { Member } from "./MemberList";

interface MemberCardProps {
  apiBaseUrl: string;
  member: Member;
  onRefresh: () => void;
}

function MemberCard({ apiBaseUrl, member, onRefresh }: MemberCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setError("");

    if (!name.trim() || !role.trim()) {
      setError("이름과 역할을 모두 입력해주세요.");
      return;
    }

    const response = await fetch(`${apiBaseUrl}/members/${member.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role }),
      credentials: "include"
    });

    if (response.ok) {
      setIsEditing(false);
      onRefresh();
      return;
    }

    setError("수정하지 못했습니다.");
  };

  const handleDelete = async () => {
    const response = await fetch(`${apiBaseUrl}/members/${member.id}`, {
      method: "DELETE",
      credentials: "include"
    });

    if (response.ok) {
      onRefresh();
      return;
    }

    setError("삭제하지 못했습니다.");
  };

  if (isEditing) {
    return (
      <article className="card editing-card">
        <div className="edit-fields">
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={role} onChange={(e) => setRole(e.target.value)} />
          {error && <p className="form-error">{error}</p>}
        </div>
        <div className="card-actions">
          <button type="button" onClick={handleUpdate}>
            저장
          </button>
          <button type="button" className="secondary-button" onClick={() => setIsEditing(false)}>
            취소
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <div>
        <h3>{member.name}</h3>
        <p>{member.role}</p>
        {error && <p className="form-error">{error}</p>}
      </div>
      <div className="card-actions">
        <button type="button" className="secondary-button" onClick={() => setIsEditing(true)}>
          수정
        </button>
        <button type="button" className="danger-button" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </article>
  );
}

export default MemberCard;
