import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          DevProfile
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>

{user ? (
  <>
    <Link to="/profile" className="hover:text-cyan-400 transition">
      My Profile
    </Link>

    {/* <Link
      to={`/u/${user._id}`}
      className="hover:text-cyan-400 transition"
    >
      Public View
    </Link> */}

    <button
      onClick={logout}
      className="px-4 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition ml-4"
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login" className="hover:text-cyan-400 transition">
      Login
    </Link>
    <Link
      to="/signup"
      className="px-4 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600"
    >
      Sign Up
    </Link>
  </>
)}


        </div>
      </div>
    </nav>
  );
}
