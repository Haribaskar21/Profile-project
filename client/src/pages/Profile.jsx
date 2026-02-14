import { useEffect, useState } from "react";
import API from "../api";
import ProfileView from "../components/ProfileView";
import ProfileEdit from "../components/ProfileEdit";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const p = await API.get("/api/profile");
    const s = await API.get("/api/skills");
    const e = await API.get("/api/experience");
    setProfile(p.data);
    setSkills(s.data);
    setExperience(e.data);
  }

  if (editMode) {
    return (
      <ProfileEdit
        profile={profile}
        skills={skills}
        experience={experience}
        reload={loadAll}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  return (
    <ProfileView
      profile={profile}
      skills={skills}
      experience={experience}
      onEdit={() => setEditMode(true)}
    />
  );
}
