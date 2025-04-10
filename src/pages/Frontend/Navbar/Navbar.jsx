import React, { useEffect, useState } from "react";
import ToggleOff from "../../../assets/Toggle/ToggleOff.png";
import ToggleOn from "../../../assets/Toggle/ToggleOn.png";

const Navbar = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="border-2 dark:border-white dark:bg-black border-black rounded-xl">
      <div className="flex justify-between">
        <h1 className="p-3 text-xl font-bold dark:text-white text-black text-center">
          Welcome to my portfolio website
        </h1>
        <div className="m-3">
          <button onClick={handleThemeSwitch} className="px-2 py-1">
            <img
              src={theme === "dark" ? ToggleOn : ToggleOff}
              alt="Theme Toggle"
              className="w-14"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
