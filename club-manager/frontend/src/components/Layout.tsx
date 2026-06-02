import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

function Layout({ children, onLogout }: LayoutProps) {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>동아리 부원 관리 시스템</h1>
        <button type="button" className="secondary-button" onClick={onLogout}>
          로그아웃
        </button>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
