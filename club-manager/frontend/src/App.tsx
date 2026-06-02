import { useEffect, useState } from "react";
import Login from "./components/Login";
import Layout from "./components/Layout";
import AddMemberForm from "./components/AddMemberForm";
import MemberList from "./components/MemberList";
import "./App.css";

const API_BASE_URL = "http://localhost:8080/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/me`, { credentials: "include" })
      .then((response) => setIsLoggedIn(response.ok))
      .finally(() => setIsCheckingSession(false));
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    setIsLoggedIn(false);
  };

  if (isCheckingSession) {
    return <div className="status-msg">로그인 상태를 확인하는 중입니다.</div>;
  }

  if (!isLoggedIn) {
    return <Login apiBaseUrl={API_BASE_URL} onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout onLogout={handleLogout}>
      <AddMemberForm apiBaseUrl={API_BASE_URL} onRefresh={triggerRefresh} />
      <MemberList apiBaseUrl={API_BASE_URL} refreshKey={refreshKey} onRefresh={triggerRefresh} />
    </Layout>
  );
}

export default App;
