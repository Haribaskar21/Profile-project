import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur border-b border-white/10">
      <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Profile Studio
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <img
              src={user.avatar}
              className="w-10 h-10 rounded-full border border-white/20"
            />
            <span className="text-sm opacity-80">{user.name}</span>
          </>
        )}
        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
