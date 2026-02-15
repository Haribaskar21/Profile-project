import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="text-center py-32 max-w-4xl mx-auto">

      <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
        Build Your Developer Identity
      </h1>

      <p className="text-gray-400 text-lg mb-12">
        Create your professional developer profile with skills,
        experience, innovation tracking and public sharing.
      </p>

      <div className="flex justify-center gap-6">
        <Link
          to="/signup"
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          Login
        </Link>
      </div>

      {/* Feature Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-24">

        <FeatureCard title="Multi User System" />
        <FeatureCard title="Public Profiles" />
        <FeatureCard title="Innovation Tracking" />

      </div>
    </div>
  );
}

function FeatureCard({ title }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">
        Modern architecture with scalable backend and secure auth.
      </p>
    </div>
  );
}
