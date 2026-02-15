export default function ExperienceTimeline({ experiences }) {
  return (
    <div className="space-y-6 border-l border-gray-300 dark:border-white/10 pl-6">
      {experiences.map((exp) => (
        <div key={exp._id} className="relative">

          <div className="absolute -left-8 top-2 w-3 h-3 bg-black dark:bg-white rounded-full" />

          <h4 className="font-semibold">
            {exp.role}
          </h4>
          <p className="text-sm opacity-60">
            {exp.company}
          </p>
          <p className="text-sm mt-2 opacity-80">
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  );
}
