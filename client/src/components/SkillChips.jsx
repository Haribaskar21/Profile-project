import API from "../api";

export default function SkillChips({ skills = [], reload }) {

  async function endorse(id) {
    try {
      await API.post(`/api/skills/${id}/endorse`);

      if (typeof reload === "function") {
        await reload();
      }

    } catch (err) {
      console.error("Endorse failed:", err.response?.data || err.message);
    }
  }

  async function remove(id) {
    try {
      await API.delete(`/api/skills/${id}`);

      if (typeof reload === "function") {
        await reload();
      }

    } catch (err) {
      console.error("Remove failed:", err.response?.data || err.message);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((s) => (
        <div
          key={s._id}
          className="px-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 flex items-center gap-2 text-sm"
        >
          <span>{s.name}</span>

          <span className="opacity-50">
            {s.endorsements ?? 0}
          </span>

          <button
            onClick={() => endorse(s._id)}
            className="text-green-500 font-bold"
          >
            +
          </button>

          <button
            onClick={() => remove(s._id)}
            className="text-red-500 font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
