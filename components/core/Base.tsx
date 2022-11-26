import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Bars4Icon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import useNavStore from "../../store/nav";
import { useTheme } from "next-themes";
const Base = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { setnavState } = useNavStore();
  const user = {
    name: "Harshad Birajdar",
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <header className="fixed dark:bg-slate-900 dark:text-slate-400 right-0 top-0left-60 bg-white flex items-center md:justify-end justify-between  border-b py-2 px-4 h-[4.3rem] z-20 w-full dark:border-slate-700">
        <Bars4Icon
          onClick={() => {
            setnavState(true);
          }}
          className="w-6 md:hidden "
        />
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt={user.name}
          />
          <h2>{user.name}</h2>

          {mounted && theme === "dark" && (
            <SunIcon
              onClick={() => {
                setTheme("light");
              }}
              className="w-6 ml-3 text-gray-500 cursor-pointer"
            />
          )}
          {mounted && theme === "light" && (
            <MoonIcon
              onClick={() => {
                setTheme("dark");
              }}
              className="w-6 ml-3 text-slate-700 cursor-pointer"
            />
          )}
        </div>
      </header>
      <Sidebar />
      <main
        className={`md:ml-60 pt-16 max-h-screen min-h-screen overflow-auto dark:bg-slate-800`}
      >
        {children}
      </main>
    </div>
  );
};

export default Base;
