import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
        <p className="text-gray-600">{profile.role}</p>
        <p className="text-gray-600">{profile.location}</p>
        <p className="text-gray-600">{profile.email}</p>
        <p className="mt-4">{profile.bio}</p>
      </div>
    </div>
  );
}

export default App;
