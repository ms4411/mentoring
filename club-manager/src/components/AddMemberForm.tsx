// ============================================
// 📝 AddMemberForm 컴포넌트 (동아리원 추가 폼)
// ============================================
// 새 동아리원을 추가하는 입력 폼입니다.
//
// 이 컴포넌트에서 배우는 핵심 개념:
// 1. useState — 폼 입력 상태 관리
// 2. useRef — 마운트 시 input에 자동 포커스 & 렌더링 없이 값 추적
// 3. useEffect — 마운트 시 동작 실행 & 의존성 배열로 변화 감지
// 4. onChange / onSubmit 이벤트 핸들링
// 5. e.preventDefault() — 폼 기본 동작(페이지 새로고침) 방지

import { useState, useRef, useEffect } from "react";
import { Member } from "../data/mockData";

interface AddMemberFormProps {
  onAdd: (member: Member) => void; // 새 멤버를 부모에게 전달하는 함수
}

function AddMemberForm({ onAdd }: AddMemberFormProps) {
  // ============================================
  // 🪝 useState — 상태(State) 관리
  // ============================================
  // useState는 컴포넌트의 "기억"입니다.
  // 값이 바뀌면 React가 자동으로 화면을 다시 그립니다(리렌더링).
  //
  // const [현재값, 값변경함수] = useState(초기값);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");

  // 제출 횟수를 추적하는 state (useEffect 의존성 배열 데모용)
  const [submitCount, setSubmitCount] = useState(0);

  // ============================================
  // 🪝 useRef — DOM 직접 접근 & 렌더링 없는 변수
  // ============================================
  // useRef는 두 가지 용도로 사용됩니다:
  //
  // 용도 1: DOM 요소에 직접 접근 (예: input에 포커스 주기)
  // → HTML의 document.getElementById()와 비슷하지만 React 방식입니다.
  const nameInputRef = useRef<HTMLInputElement>(null);
  //
  // 용도 2: 값이 바뀌어도 리렌더링을 발생시키지 않는 변수
  // → useState와 다르게, 값이 바뀌어도 화면이 다시 그려지지 않습니다.
  // → 렌더링과 무관한 내부 카운터나 이전 값 저장 등에 사용합니다.
  const nextIdRef = useRef(100);
  // nextIdRef.current = 100 → 새 멤버에게 부여할 다음 ID
  // 이 값은 화면에 표시되지 않으므로 useState 대신 useRef를 씁니다.

  // ============================================
  // 🪝 useEffect — 사이드 이펙트 처리
  // ============================================
  //
  // useEffect(실행할함수, 의존성배열);
  //
  // 의존성 배열에 따라 실행 시점이 달라집니다:
  // - [] (빈 배열): 컴포넌트가 처음 화면에 나타날 때(마운트) 1번만 실행
  // - [a, b]: a 또는 b 값이 변경될 때마다 실행
  // - 배열 생략: 매 렌더링마다 실행 (거의 사용하지 않음)

  // 📌 마운트 시 1회 실행: 환영 메시지 출력 + input에 포커스
  useEffect(() => {
    console.log("🎉 동아리원 관리 시스템에 오신 것을 환영합니다!");

    // useRef로 가져온 DOM 요소에 직접 접근하여 포커스를 줍니다.
    // nameInputRef.current가 실제 <input> DOM 요소를 가리킵니다.
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []); // ← 빈 배열 = 마운트 시 1번만 실행

  // 📌 submitCount가 변경될 때마다 실행: 의존성 배열 활용 데모
  useEffect(() => {
    if (submitCount > 0) {
      console.log(`📊 지금까지 총 ${submitCount}명의 동아리원을 추가했습니다.`);
    }
  }, [submitCount]); // ← submitCount가 바뀔 때마다 이 함수가 재실행됨

  // ============================================
  // 📌 이벤트 핸들러: onSubmit — 폼 제출 처리
  // ============================================
  const handleSubmit = (e: React.FormEvent) => {
    // 🛑 e.preventDefault() — 매우 중요!
    // HTML <form>의 기본 동작은 페이지를 새로고침하는 것입니다.
    // SPA(Single Page Application)에서는 이를 막고,
    // JavaScript로 직접 데이터를 처리합니다.
    e.preventDefault();

    // 빈 값 체크 — 이름이 비어있으면 제출하지 않음
    if (!name.trim()) return;

    // 새 멤버 객체 생성
    const newMember: Member = {
      id: nextIdRef.current, // useRef의 현재 값을 ID로 사용
      name: name.trim(),
      role: role.trim() || "부원", // 역할이 비어있으면 기본값 "부원"
      skill: skill.trim() || "미정",
      isActive: true,
    };

    // useRef 값 증가 — 다음 멤버를 위한 ID 준비
    // ⚠️ 이 값은 화면에 안 보이므로 useState가 아닌 useRef 사용
    nextIdRef.current += 1;

    // 부모 컴포넌트(App)에게 새 멤버 전달
    onAdd(newMember);

    // 제출 횟수 증가 → useEffect가 감지하여 콘솔에 로그 출력
    setSubmitCount((prev) => prev + 1);

    // 폼 초기화
    setName("");
    setRole("");
    setSkill("");

    // 폼 제출 후 이름 input에 다시 포커스
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  return (
    // 📌 onSubmit: form 태그에 제출 이벤트 핸들러를 연결합니다.
    // Enter 키를 누르거나, submit 버튼을 클릭하면 handleSubmit이 실행됩니다.
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>새 동아리원 추가</h2>

      <div className="form-row">
        {/*
          📌 onChange 이벤트:
          사용자가 input에 글자를 입력할 때마다 발생합니다.
          e.target.value로 현재 입력된 값을 가져와서
          useState의 setter 함수로 상태를 업데이트합니다.

          📌 ref={nameInputRef}:
          이 input의 DOM 요소를 nameInputRef에 연결합니다.
          이후 nameInputRef.current로 이 input에 직접 접근할 수 있습니다.
        */}
        <input
          ref={nameInputRef}
          type="text"
          placeholder="이름 (필수)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="역할 (예: 부장)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="text"
          placeholder="기술 스택"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        {/* type="submit" 버튼은 form의 onSubmit 이벤트를 발생시킵니다 */}
        <button type="submit">추가</button>
      </div>
    </form>
  );
}

export default AddMemberForm;
