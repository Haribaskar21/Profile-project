export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}
