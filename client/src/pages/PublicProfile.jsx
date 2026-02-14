import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import ProfileView from "../components/ProfileView";

export default function PublicProfile() {
  const { userId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/api/public/${userId}/profile`).then(res => setData(res.data));
  }, [userId]);

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <ProfileView
      profile={data.profile || {}}
      skills={data.skills || []}
      experience={data.experience || []}
      onEdit={() => {}}
    />
  );
}
