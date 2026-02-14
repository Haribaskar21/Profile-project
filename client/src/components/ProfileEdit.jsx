import { useState } from "react";
import API from "../api";
import AvatarUploader from "./AvatarUploader";
import SkillChips from "./SkillChips";
import ExperienceTimeline from "./ExperienceTimeline";

export default function ProfileEdit({ profile, skills, experience, reload, onCancel }) {
  const [form, setForm] = useState(profile);
  const [skillName, setSkillName] = useState("");
  const [expForm, setExpForm] = useState({
    role: "", company: "", startDate: "", endDate: "", description: ""
  });

  async function saveProfile() {
    await API.put("/api/profile", form);
    reload();
    onCancel();
  }

  async function addSkill() {
    if (!skillName) return;
    await API.post("/api/skills", { name: skillName, level: "Beginner" });
    setSkillName("");
    reload();
  }

  async function addExperience() {
    await API.post("/api/experience", expForm);
    setExpForm({ role: "", company: "", startDate: "", endDate: "", description: "" });
    reload();
  }

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Profile */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <AvatarUploader
          currentAvatar={form.avatar}
          onUpdated={reload}
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <input className="p-2 rounded bg-black/30" placeholder="Title"
            value={form.title || ""} onChange={e=>setForm({...form, title:e.target.value})}/>
          <input className="p-2 rounded bg-black/30" placeholder="Location"
            value={form.location || ""} onChange={e=>setForm({...form, location:e.target.value})}/>
        </div>

        <textarea className="w-full mt-4 p-2 rounded bg-black/30" placeholder="Bio"
          value={form.bio || ""} onChange={e=>setForm({...form, bio:e.target.value})}/>

        <div className="flex gap-3 mt-4">
          <button onClick={saveProfile}
            className="px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-purple-600">
            Save
          </button>
          <button onClick={onCancel}
            className="px-4 py-2 rounded bg-white/10">
            Cancel
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold mb-4">Edit Skills</h2>
        <div className="flex gap-2 mb-4">
          <input className="flex-1 p-2 rounded bg-black/30" placeholder="New skill"
            value={skillName} onChange={e=>setSkillName(e.target.value)}/>
          <button onClick={addSkill} className="px-4 rounded bg-cyan-500/30">Add</button>
        </div>
        <SkillChips skills={skills} reload={reload} />
      </div>

      {/* Experience */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold mb-4">Edit Experience</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input className="p-2 rounded bg-black/30" placeholder="Role"
            value={expForm.role} onChange={e=>setExpForm({...expForm, role:e.target.value})}/>
          <input className="p-2 rounded bg-black/30" placeholder="Company"
            value={expForm.company} onChange={e=>setExpForm({...expForm, company:e.target.value})}/>
          <input className="p-2 rounded bg-black/30" placeholder="Start Date"
            value={expForm.startDate} onChange={e=>setExpForm({...expForm, startDate:e.target.value})}/>
          <input className="p-2 rounded bg-black/30" placeholder="End Date"
            value={expForm.endDate} onChange={e=>setExpForm({...expForm, endDate:e.target.value})}/>
        </div>
        <textarea className="w-full p-2 rounded bg-black/30 mb-4" placeholder="Description"
          value={expForm.description} onChange={e=>setExpForm({...expForm, description:e.target.value})}/>

        <button onClick={addExperience}
          className="mb-6 px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-purple-600">
          Add Experience
        </button>

        <ExperienceTimeline items={experience} reload={reload} />
      </div>
    </div>
  );
}
