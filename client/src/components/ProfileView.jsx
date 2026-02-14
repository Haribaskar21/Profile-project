import AnimatedCard from "./AnimatedCard";
import StatCard from "./StatCard";
import SkillChips from "./SkillChips";
import ExperienceTimeline from "./ExperienceTimeline";

export default function ProfileView({ profile, skills, experience, onEdit }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <AnimatedCard className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={profile.avatar || user?.avatar}
            className="w-28 h-28 rounded-full border border-white/20 object-cover"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="opacity-80">{profile.title || "Your Title"}</p>
            <p className="text-sm opacity-60">{profile.location || "Location"}</p>
          </div>
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 transition hover:opacity-90"
          >
            Edit Profile
          </button>
        </div>
        <p className="mt-4 opacity-80">{profile.bio || "Add your bio..."}</p>
      </AnimatedCard>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Skills" value={skills.length} />
        <StatCard title="Experience" value={experience.length} />
        <StatCard title="Profile Strength" value="Strong" />
      </div>

      {/* Skills */}
      <AnimatedCard className="p-6">
        <h2 className="text-xl font-bold mb-4">Skills</h2>
        <SkillChips skills={skills} reload={() => {}} />
      </AnimatedCard>

      {/* Experience */}
      <AnimatedCard className="p-6">
        <h2 className="text-xl font-bold mb-4">Experience</h2>
        <ExperienceTimeline items={experience} reload={() => {}} />
      </AnimatedCard>
    </div>
  );
}
