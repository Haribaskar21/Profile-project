import API from "../api";

export default function SkillChips({ skills, reload }) {
  async function endorse(id) {
    await API.post(`/api/skills/${id}/endorse`);
    reload();
  }

  async function remove(id) {
    await API.delete(`/api/skills/${id}`);
    reload();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <div
          key={s._id}
          className="px-3 py-2 rounded-xl bg-white/10 flex items-center gap-2"
        >
          <span>{s.name}</span>
          <span className="text-xs opacity-60">👍 {s.endorsements}</span>
          <button
            onClick={() => endorse(s._id)}
            className="text-green-400 text-sm"
          >
            +
          </button>
          <button
            onClick={() => remove(s._id)}
            className="text-red-400 text-sm"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
