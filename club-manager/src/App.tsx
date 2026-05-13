// ============================================
// 🚀 App.tsx — 최상위 컴포넌트 (진입점)
// ============================================
// React 앱의 루트 컴포넌트입니다.
// 모든 하위 컴포넌트를 조합하고, 전체 상태(state)를 관리합니다.
//
// 💡 React의 데이터 흐름:
// 데이터는 부모 → 자식 방향으로 흐릅니다 (단방향 데이터 흐름).
// 자식이 부모의 데이터를 변경하려면, 부모가 "변경 함수"를
// Props로 내려주고, 자식이 그 함수를 호출하는 방식입니다.

import { useState } from "react";
import { Member, initialMembers } from "./data/mockData";
import Layout from "./components/Layout";
import AddMemberForm from "./components/AddMemberForm";
import MemberList from "./components/MemberList";

function App() {
  // ============================================
  // 🪝 useState로 동아리원 목록 상태 관리
  // ============================================
  // initialMembers(Mock Data)를 초기값으로 사용합니다.
  // members가 변경되면 React가 자동으로 화면을 다시 그립니다.
  const [members, setMembers] = useState<Member[]>(initialMembers);

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");

  // ============================================
  // 📌 핸들러 함수들 — 자식 컴포넌트에 Props로 전달됩니다
  // ============================================

  // 새 동아리원 추가
  // 기존 배열을 직접 수정(push)하지 않고, 새 배열을 만들어서 교체합니다.
  // React에서는 상태를 "불변(immutable)"하게 다루는 것이 원칙입니다.
  const handleAddMember = (newMember: Member) => {
    // 스프레드 연산자(...)로 기존 배열을 복사하고, 새 멤버를 뒤에 추가
    setMembers((prev) => [...prev, newMember]);
  };

  // 활동 상태 토글 (활동 중 ↔ 비활동)
  const handleToggleActive = (id: number) => {
    setMembers((prev) =>
      // .map()으로 새 배열을 만들면서, 해당 id의 멤버만 isActive를 반전
      prev.map((member) =>
        member.id === id
          ? { ...member, isActive: !member.isActive }
          : member
      )
    );
  };

  // 동아리원 삭제
  const handleDelete = (id: number) => {
    // .filter()로 해당 id를 제외한 새 배열을 만듭니다.
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  // 검색어로 필터링된 멤버 목록
  // 이름, 역할, 기술 중 하나라도 검색어를 포함하면 표시
  const filteredMembers = members.filter(
    (member) =>
      member.name.includes(searchTerm) ||
      member.role.includes(searchTerm) ||
      member.skill.includes(searchTerm)
  );

  return (
    // 💡 Layout 컴포넌트의 children prop 활용
    // <Layout>과 </Layout> 사이의 모든 내용이 children으로 전달됩니다.
    <Layout>
      {/* 📌 Fragment(<> </>) 대신 Layout이 루트 래퍼 역할을 합니다 */}

      {/* 동아리원 추가 폼 — onAdd 함수를 Props로 전달 */}
      <AddMemberForm onAdd={handleAddMember} />

      {/* 검색 바 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="이름, 역할, 기술로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="member-count">
          전체 {members.length}명 | 검색 결과 {filteredMembers.length}명
        </span>
      </div>

      {/* 동아리원 목록 — 필터링된 데이터와 핸들러 함수들을 Props로 전달 */}
      <MemberList
        members={filteredMembers}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default App;
