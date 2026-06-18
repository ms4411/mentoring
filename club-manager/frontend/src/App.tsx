import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import AddMemberForm from "./components/AddMemberForm";
import MemberList from "./components/MemberList";
import About from "./pages/About";
import "./App.css";

const API_BASE_URL = "http://localhost:8080/api";

function ManagePage({
  apiBaseUrl,
  refreshKey,
  onRefresh,
  onLogout,
}: {
  apiBaseUrl: string;
  refreshKey: number;
  onRefresh: () => void;
  onLogout: () => void;
}) {
  return (
    <Layout onLogout={onLogout}>
      <AddMemberForm apiBaseUrl={apiBaseUrl} onRefresh={onRefresh} />
      <MemberList
        apiBaseUrl={apiBaseUrl}
        refreshKey={refreshKey}
        onRefresh={onRefresh}
      />
    </Layout>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(
    () => setRefreshKey((prev) => prev + 1), //새로고침
    [],
  );

  useEffect(() => { //로그인 상태를 확인 (만료인 토큰을 냅두면 쓰나..)
    fetch(`${API_BASE_URL}/auth/me`, { credentials: "include" })
      .then((response) => setIsLoggedIn(response.ok))
      .finally(() => setIsCheckingSession(false));
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
  }, []);

  if (isCheckingSession) {
    return <div className="status-msg">로그인 상태를 확인하는 중입니다.</div>;
  }

  return (
    <BrowserRouter>
      <nav className="top-nav">
        <Link to="/">부원 관리</Link>
        <Link to="/about">동아리 소개</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? ( //로그인 상태야?
              <ManagePage // ㅇㅇ 로그인 되어 있음
                apiBaseUrl={API_BASE_URL}
                refreshKey={refreshKey}
                onRefresh={triggerRefresh}
                onLogout={handleLogout}
              />
            ) : (
              <Login // ㄴㄴ 아직이야~
                apiBaseUrl={API_BASE_URL}
                onLoginSuccess={() => setIsLoggedIn(true)}
              />
            )
          }
        />
        <Route
          path="/about"
          element={<About onLogout={isLoggedIn ? handleLogout : undefined} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
