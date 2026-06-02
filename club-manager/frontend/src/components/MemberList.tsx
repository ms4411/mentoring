import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";

export interface Member {
  id: number;
  name: string;
  role: string;
}

interface MemberListProps {
  apiBaseUrl: string;
  refreshKey: number;
  onRefresh: () => void;
}

export default function MemberList({ apiBaseUrl, refreshKey, onRefresh }: MemberListProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");

    fetch(`${apiBaseUrl}/members`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("부원 목록을 불러오지 못했습니다.");
        }
        return res.json();
      })
      .then((data: Member[]) => setMembers(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [apiBaseUrl, refreshKey]);

  if (isLoading) {
    return <div className="status-msg">부원 목록을 불러오는 중입니다.</div>;
  }

  if (error) {
    return <div className="error-msg">{error}</div>;
  }

  if (members.length === 0) {
    return <div className="empty-msg">부원이 없습니다.</div>;
  }

  return (
    <div className="member-list">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          apiBaseUrl={apiBaseUrl}
          member={member}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}
