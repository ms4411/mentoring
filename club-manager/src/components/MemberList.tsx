// ============================================
// 📋 MemberList 컴포넌트 (동아리원 목록)
// ============================================
// 동아리원 배열을 받아서 .map()으로 카드 목록을 렌더링합니다.
//
// 💡 List Rendering (리스트 렌더링):
// 배열 데이터를 화면에 표시할 때 .map() 메서드를 사용합니다.
// 이때 각 항목에 고유한 key를 반드시 지정해야 합니다.
// key가 있어야 React가 어떤 항목이 변경/추가/삭제되었는지 효율적으로 판단할 수 있습니다.

import { Member } from "../data/mockData";
import MemberCard from "./MemberCard";

interface MemberListProps {
  members: Member[];                      // 동아리원 배열
  onToggleActive: (id: number) => void;   // 활동 상태 토글 함수
  onDelete: (id: number) => void;         // 삭제 함수
}

function MemberList({ members, onToggleActive, onDelete }: MemberListProps) {
  // 멤버가 없을 때 안내 메시지 표시
  if (members.length === 0) {
    return <p className="empty-message">등록된 동아리원이 없습니다.</p>;
  }

  return (
    <div className="member-list">
      {/*
        💡 .map() 리스트 렌더링:
        members 배열의 각 요소(member)를 MemberCard 컴포넌트로 변환합니다.

        ⚠️ key={member.id} — 매우 중요!
        React는 key를 사용해 각 항목을 구분합니다.
        key가 없으면 경고가 뜨고, 리스트 업데이트 시 버그가 생길 수 있습니다.
        key에는 배열 내에서 고유한 값(보통 id)을 사용합니다.
        (index를 key로 쓰는 것은 권장하지 않습니다 — 순서가 바뀌면 문제 발생)
      */}
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          onToggleActive={onToggleActive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MemberList;
