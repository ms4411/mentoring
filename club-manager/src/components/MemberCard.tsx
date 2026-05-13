// ============================================
// 🪪 MemberCard 컴포넌트 (동아리원 카드)
// ============================================
// 동아리원 한 명의 정보를 카드 형태로 보여주는 컴포넌트입니다.
//
// 💡 컴포넌트 분리의 이유:
// App.tsx에 모든 코드를 넣으면 수백 줄이 되어 관리가 어렵습니다.
// 각 역할별로 컴포넌트를 나누면 재사용도 가능하고 유지보수도 쉽습니다.

import { Member } from "../data/mockData";

// Props 타입 정의
// 이 컴포넌트가 부모로부터 어떤 데이터를 받을지 명시합니다.
interface MemberCardProps {
  member: Member;                    // 동아리원 데이터 객체
  onToggleActive: (id: number) => void;  // 활동 상태 토글 함수
  onDelete: (id: number) => void;        // 삭제 함수
}

function MemberCard({ member, onToggleActive, onDelete }: MemberCardProps) {
  // 💡 이벤트 버블링과 stopPropagation 설명:
  // 카드 전체를 클릭하면 활동 상태가 토글되는데,
  // 삭제 버튼도 카드 안에 있으므로 삭제 버튼 클릭 시
  // 카드 클릭 이벤트도 함께 발생합니다 (= 이벤트 버블링).
  // e.stopPropagation()으로 이벤트가 부모로 전파되는 것을 막습니다.
  const handleDelete = (e: React.MouseEvent) => {
    // 🛑 이벤트 버블링 중단!
    // 이걸 안 하면 삭제 버튼 클릭 → 카드 클릭 이벤트도 동시에 발생
    e.stopPropagation();
    onDelete(member.id);
  };

  return (
    // 💡 onClick: 카드 전체를 클릭하면 활동 상태를 토글합니다.
    // className을 조건부로 적용 — 비활동 멤버는 흐리게 표시
    <div
      className={`member-card ${member.isActive ? "" : "inactive"}`}
      onClick={() => onToggleActive(member.id)}
    >
      <div className="member-info">
        <h3>{member.name}</h3>
        <span className="role-badge">{member.role}</span>
      </div>
      <p className="skill">기술: {member.skill}</p>
      <p className="status">
        상태: {member.isActive ? "✅ 활동 중" : "⛔ 비활동"}
      </p>
      {/* 삭제 버튼 — stopPropagation으로 버블링 방지 */}
      <button className="delete-btn" onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
}

export default MemberCard;
