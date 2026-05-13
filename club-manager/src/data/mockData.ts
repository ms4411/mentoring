// ============================================
// 📦 Mock Data (모의 데이터)
// ============================================
// 백엔드 API가 없으므로, 프론트엔드에서 사용할
// 초기 데이터를 직접 정의합니다.
// 실제 프로젝트에서는 이 데이터가 서버에서 오게 됩니다.

// 동아리원 한 명의 데이터 형태를 TypeScript interface로 정의
// interface는 "이 객체는 이런 모양이어야 해!" 라는 약속(계약)입니다.
export interface Member {
  id: number;        // 고유 식별자 (각 멤버를 구분하는 번호)
  name: string;      // 이름
  role: string;      // 역할 (예: 부장, 부원 등)
  skill: string;     // 주요 기술 스택
  isActive: boolean; // 활동 중인지 여부
}

// 초기 동아리원 목록 (Mock Data)
export const initialMembers: Member[] = [
  {
    id: 1,
    name: "김민수",
    role: "부장",
    skill: "React",
    isActive: true,
  },
  {
    id: 2,
    name: "이서연",
    role: "부부장",
    skill: "TypeScript",
    isActive: true,
  },
  {
    id: 3,
    name: "박지훈",
    role: "부원",
    skill: "Node.js",
    isActive: false,
  },
  {
    id: 4,
    name: "최유진",
    role: "부원",
    skill: "Python",
    isActive: true,
  },
];
