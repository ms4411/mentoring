import React, { useState } from "react";
import styled from "styled-components";
import { Member } from "./MemberList";

interface MemberCardProps {
  apiBaseUrl: string;
  member: Member;
  onRefresh: () => void;
}

const CardContainer = styled.article`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 18px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.06);

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const MemberInfo = styled.div`
  min-width: 0;
`;

const MemberName = styled.h3`
  margin: 0 0 6px;
  color: #1e293b;
  font-size: 18px;
`;

const MemberRole = styled.p`
  margin: 0;
  color: #3b82f6;
  font-weight: bold;
  font-size: 14px;
`;

const EditFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  flex: 1;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

function MemberCard({ apiBaseUrl, member, onRefresh }: MemberCardProps) {
  console.log(`[로그] ${member.name} 부원의 카드가 화면을 다시 그렸습니다.`);

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

    try {
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
    } catch {
      setError("서버와 통신할 수 없습니다.");
    }
  };

  const handleDelete = async () => {
    setError("");

    try {
      const response = await fetch(`${apiBaseUrl}/members/${member.id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        onRefresh();
        return;
      }

      setError("삭제하지 못했습니다.");
    } catch {
      setError("서버와 통신할 수 없습니다.");
    }
  };

  if (isEditing) {
    return (
      <CardContainer>
        <EditFields>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={role} onChange={(e) => setRole(e.target.value)} />
          {error && <p className="form-error">{error}</p>}
        </EditFields>
        <div className="card-actions">
          <button type="button" onClick={handleUpdate}>
            저장
          </button>
          <button type="button" className="secondary-button" onClick={() => setIsEditing(false)}>
            취소
          </button>
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <MemberInfo>
        <MemberName>{member.name}</MemberName>
        <MemberRole>{member.role}</MemberRole>
        {error && <p className="form-error">{error}</p>}
      </MemberInfo>
      <div className="card-actions">
        <button type="button" className="secondary-button" onClick={() => setIsEditing(true)}>
          수정
        </button>
        <button type="button" className="danger-button" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </CardContainer>
  );
}

export default React.memo(MemberCard, (prevProps, nextProps) => {
  return (
    prevProps.apiBaseUrl === nextProps.apiBaseUrl &&
    prevProps.onRefresh === nextProps.onRefresh &&
    prevProps.member.id === nextProps.member.id &&
    prevProps.member.name === nextProps.member.name &&
    prevProps.member.role === nextProps.member.role
  );
});
