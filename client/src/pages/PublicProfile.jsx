import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import ProfileView from "../components/ProfileView";

export default function PublicProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/api/profile/${id}`).then((res) =>
      setData(res.data)
    );
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <ProfileView
      profile={data.profile}
      skills={data.skills}
      experience={data.experience}
      onEdit={() => {}}
    />
  );
}
