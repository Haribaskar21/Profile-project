import { useEffect, useState } from "react";
import API from "../api";
import AvatarUploader from "./AvatarUploader";
import SkillChips from "./SkillChips";
import ExperienceTimeline from "./ExperienceTimeline";

export default function ProfileEdit({
  profile = {},
  skills = [],
  experience = [],
  reload,
  onCancel,
}) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);
  const [addingExp, setAddingExp] = useState(false);

  const [expForm, setExpForm] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    setForm(profile || {});
  }, [profile]);

  async function saveProfile() {
    try {
      setSaving(true);
      await API.put("/api/profile", form);
      await reload?.();
      onCancel?.();
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  }

  async function addSkill() {
    if (!skillName.trim()) return;

    try {
      setAddingSkill(true);
      await API.post("/api/skills", {
        name: skillName,
        level: "Beginner",
      });
      setSkillName("");
      await reload?.();
    } catch (err) {
      console.error("Skill add failed", err);
    } finally {
      setAddingSkill(false);
    }
  }

  async function addExperience() {
    if (!expForm.role || !expForm.company) return;

    try {
      setAddingExp(true);
      await API.post("/api/experience", expForm);
      setExpForm({
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      await reload?.();
    } catch (err) {
      console.error("Experience add failed", err);
    } finally {
      setAddingExp(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1120] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-10 md:py-14">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <aside className="space-y-8">

            <Card title="Profile Picture">
              <AvatarUploader
                currentAvatar={form.avatar}
                onUpdated={reload}
              />
            </Card>

            <Card title="Basic Info">
              <Input
                label="Full Name"
                value={form.name || ""}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Input
                label="Title"
                value={form.title || ""}
                onChange={(v) => setForm({ ...form, title: v })}
              />
              <Input
                label="Location"
                value={form.location || ""}
                onChange={(v) => setForm({ ...form, location: v })}
              />
            </Card>

            <Card title="Social Links">
              <Input
                label="LinkedIn"
                value={form.linkedin || ""}
                onChange={(v) => setForm({ ...form, linkedin: v })}
              />
              <Input
                label="GitHub"
                value={form.github || ""}
                onChange={(v) => setForm({ ...form, github: v })}
              />
              <Input
                label="Website"
                value={form.website || ""}
                onChange={(v) => setForm({ ...form, website: v })}
              />
            </Card>

          </aside>

          {/* RIGHT COLUMN */}
          <main className="lg:col-span-2 space-y-8">

            <Card title="About">
              <textarea
                rows="4"
                className="w-full p-4 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 outline-none"
                value={form.bio || ""}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
              />
            </Card>

            <Card title="Manage Skills">
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  className="flex-1 p-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 outline-none"
                  placeholder="Add new skill"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />
                <button
                  onClick={addSkill}
                  disabled={addingSkill}
                  className="px-6 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black w-full sm:w-auto"
                >
                  {addingSkill ? "Adding..." : "Add"}
                </button>
              </div>

              <SkillChips skills={skills} reload={reload} />
            </Card>

            <Card title="Manage Experience">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input
                  label="Role"
                  value={expForm.role}
                  onChange={(v) =>
                    setExpForm({ ...expForm, role: v })
                  }
                />
                <Input
                  label="Company"
                  value={expForm.company}
                  onChange={(v) =>
                    setExpForm({ ...expForm, company: v })
                  }
                />
              </div>

              <textarea
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 outline-none mb-6"
                placeholder="Description"
                value={expForm.description}
                onChange={(e) =>
                  setExpForm({
                    ...expForm,
                    description: e.target.value,
                  })
                }
              />

              <button
                onClick={addExperience}
                disabled={addingExp}
                className="px-6 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black w-full sm:w-auto"
              >
                {addingExp ? "Adding..." : "Add Experience"}
              </button>

              <div className="mt-8">
                <ExperienceTimeline experiences={experience} />
              </div>
            </Card>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <button
                onClick={onCancel}
                className="px-6 py-2 rounded-xl border border-gray-300 dark:border-white/20 w-full sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="px-6 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black w-full sm:w-auto"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Card({ title, children }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm opacity-60">{label}</label>
      <input
        className="w-full p-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
