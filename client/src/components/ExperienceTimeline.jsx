import API from "../api";

export default function ExperienceTimeline({ items, reload }) {
  async function remove(id) {
    await API.delete(`/api/experience/${id}`);
    reload();
  }

  return (
    <div className="space-y-4">
      {items.map((e) => (
        <div
          key={e._id}
          className="p-4 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="font-bold">{e.role}</h3>
          <p className="opacity-70">{e.company}</p>
          <p className="text-sm opacity-50">
            {e.startDate} - {e.endDate}
          </p>
          <p className="mt-2 text-sm opacity-80">{e.description}</p>
          <button
            onClick={() => remove(e._id)}
            className="mt-2 text-red-400 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
