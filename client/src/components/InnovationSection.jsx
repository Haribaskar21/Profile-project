export default function InnovationSection({ projects }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">

      {projects?.map((proj, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-[1.02] transition"
        >
          <h3 className="text-xl font-semibold">{proj.title}</h3>
          <p className="text-gray-400 text-sm mt-2">{proj.description}</p>
        </div>
      ))}

    </div>
  );
}
