import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-8 rounded-2xl w-full max-w-md border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
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
          Login
        </button>
        <p className="mt-4 text-sm opacity-70">
          No account? <Link to="/signup" className="text-cyan-400">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
