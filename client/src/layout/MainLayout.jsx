import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-[#0b1120] text-black dark:text-white transition-colors duration-500">
        <Navbar dark={dark} setDark={setDark} />
        <div className="pt-24 px-6 md:px-16">
          {children}
        </div>
      </div>
    </div>
  );
}
