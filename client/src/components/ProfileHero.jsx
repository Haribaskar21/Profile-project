export default function ProfileHero({ user, onEdit }) {
  return (
    <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />

      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">

        <img
          src={user?.avatar || "https://i.pravatar.cc/150"}
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl object-cover"
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {user?.name || "Your Name"}
          </h1>

          <p className="text-gray-300 mt-2">
            {user?.title || "Full Stack Developer"}
          </p>

          <div className="flex gap-6 mt-6 justify-center md:justify-start">
            <Stat number="18" label="Skills" />
            <Stat number="12" label="Projects" />
            <Stat number="3+" label="Years Exp" />
          </div>
        </div>

        <button
          onClick={onEdit}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
        >
          Edit Profile
        </button>

      </div>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold">{number}</p>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}
