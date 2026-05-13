// ============================================
// 🏠 Layout 컴포넌트 (레이아웃)
// ============================================
// children prop을 활용한 레이아웃 컴포넌트입니다.
//
// 💡 children이란?
// 컴포넌트 태그 사이에 넣은 내용이 자동으로 children으로 전달됩니다.
// 예시: <Layout>여기가 children!</Layout>
//
// 이렇게 하면 Layout은 "틀(껍데기)"만 담당하고,
// 안에 들어갈 내용은 사용하는 쪽에서 자유롭게 결정할 수 있습니다.

import { ReactNode } from "react";

// Props 타입 정의 — children의 타입은 ReactNode입니다.
// ReactNode는 React가 렌더링할 수 있는 모든 것을 의미합니다.
// (문자열, 숫자, JSX, 배열, null 등)
interface LayoutProps {
  children: ReactNode;
}

// Layout 컴포넌트: 공통 헤더와 푸터를 감싸는 껍데기 역할
function Layout({ children }: LayoutProps) {
  return (
    // 💡 JSX 규칙: 반드시 하나의 루트 요소로 감싸야 합니다.
    // 여기서는 <div>가 루트 요소입니다.
    <div className="layout">
      {/* 📌 className은 HTML의 class와 같습니다. */}
      {/* React에서는 class가 JavaScript 예약어이므로 className을 씁니다. */}
      <header className="header">
        <h1>🏫 동아리원 관리 시스템</h1>
        <p>소프트웨어 마이스터고 개발 동아리</p>
      </header>

      {/* 💡 {children} — 이 자리에 부모가 넘겨준 내용이 렌더링됩니다 */}
      <main className="main-content">{children}</main>

      <footer className="footer">
        <p>© 2026 React 수업 예제 프로젝트</p>
      </footer>
    </div>
  );
}

export default Layout;
