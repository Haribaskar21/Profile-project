import { useEffect, useState } from "react";
import API from "../api";
import ProfileView from "../components/ProfileView";
import ProfileEdit from "../components/ProfileEdit";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    const [p, s, e] = await Promise.all([
      API.get("/api/profile"),
      API.get("/api/skills"),
      API.get("/api/experience"),
    ]);

    setProfile(p.data || {});
    setSkills(s.data || []);
    setExperience(e.data || []);
    setLoading(false);
  }

  if (loading) return <div>Loading...</div>;

  if (editMode)
    return (
      <ProfileEdit
        profile={profile}
        reload={loadAll}
        onCancel={() => setEditMode(false)}
      />
    );

  return (
    <ProfileView
      profile={profile}
      skills={skills}
      experience={experience}
      onEdit={() => setEditMode(true)}
    />
  );
}
