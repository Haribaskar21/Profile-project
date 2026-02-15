import SkillChips from "./SkillChips";
import ExperienceTimeline from "./ExperienceTimeline";

export default function ProfileView({
  profile,
  skills,
  experience,
  onEdit,
}) {
  const completion =
    (profile?.name ? 20 : 0) +
    (profile?.bio ? 20 : 0) +
    skills.length * 5 +
    experience.length * 10;

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

      {/* LEFT */}
      <aside className="space-y-6">

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center shadow-sm">

          <img
            src={profile?.avatar || "https://i.pravatar.cc/200"}
            className="w-32 h-32 mx-auto rounded-full object-cover"
          />

          <h2 className="text-2xl font-bold mt-4">
            {profile?.name}
          </h2>

          <p className="opacity-70">{profile?.title}</p>

          <p className="text-sm opacity-50 mt-1">
            {profile?.location}
          </p>

          <button
            onClick={onEdit}
            className="mt-6 w-full py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Strength */}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <p className="text-sm opacity-60">Profile Strength</p>
          <p className="text-3xl font-bold mt-2">{completion}%</p>
          <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full mt-3">
            <div
              className="h-full bg-black dark:bg-white rounded-full transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

      </aside>

      {/* RIGHT */}
      <main className="lg:col-span-2 space-y-10">

        <Section title="About">
          <p className="leading-relaxed opacity-80">
            {profile?.bio}
          </p>
        </Section>

        <Section title="Skills">
          <SkillChips skills={skills} />
        </Section>

        <Section title="Experience">
          <ExperienceTimeline experiences={experience} />
        </Section>

      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
}
