function ProfileInsights({ profile, skills, experience }) {
  const impact = skills.length * 3 + experience.length * 5;

  return (
    <div className="space-y-4">

      <Stat title="Skill Density" value={skills.length} />
      <Stat title="Experience Depth" value={experience.length} />
      <Stat title="Impact Score" value={impact} />

    </div>
  );
}
