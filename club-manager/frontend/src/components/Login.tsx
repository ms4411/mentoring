import { useState } from "react";

interface LoginProps {
  apiBaseUrl: string;
  onLoginSuccess: () => void;
}

export default function Login({ apiBaseUrl, onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include"
    });

    if (response.ok) {
      onLoginSuccess();
      return;
    }

    setError("아이디나 비밀번호가 틀렸습니다. admin / 1234로 로그인하세요.");
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h1>관리자 로그인</h1>
        <input
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">출입증 발급받기</button>
      </form>
    </div>
  );
}
