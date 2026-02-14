import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await API.post("/api/auth/signup", { name, email, password });
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-8 rounded-2xl w-full max-w-md border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
        <input
          className="w-full mb-4 p-3 rounded-xl bg-black/30 border border-white/10"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full mb-4 p-3 rounded-xl bg-black/30 border border-white/10"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 p-3 rounded-xl bg-black/30 border border-white/10"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600">
          Sign Up
        </button>
        <p className="mt-4 text-sm opacity-70">
          Already have account? <Link to="/login" className="text-cyan-400">Login</Link>
        </p>
      </form>
    </div>
  );
}
