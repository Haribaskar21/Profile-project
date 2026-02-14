import { useState } from "react";
import API from "../api";

export default function AvatarUploader({ currentAvatar, onUpdated }) {
  const [loading, setLoading] = useState(false);

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const base64 = await toBase64(file);

    // Update profile avatar (we store it in Profile for simplicity)
    await API.put("/api/profile", { avatar: base64 });
    setLoading(false);
    onUpdated();
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src={currentAvatar}
        className="w-24 h-24 rounded-full border border-white/20 object-cover"
      />
      <label className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer transition">
        {loading ? "Uploading..." : "Change Avatar"}
        <input type="file" className="hidden" onChange={handleChange} />
      </label>
    </div>
  );
}
