import React from "react";
import Sidebar from "./Sidebar";
import { Bars4Icon } from "@heroicons/react/24/solid";
import useNavStore from "../../store/nav";
const Base = ({ children }: { children: React.ReactNode }) => {
  const { setnavState } = useNavStore();
  const user = {
    name: "Harshad Birajdar",
  };

  return (
    <div>
      <header className="fixed right-0 top-0left-60 bg-white flex items-center md:justify-end justify-between  border-b py-2 px-4 h-[4.3rem] z-20 w-full">
        <Bars4Icon
          onClick={() => {
            setnavState(true);
          }}
          className="w-6 md:hidden "
        />
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt={user.name}
          />
          <h2>{user.name}</h2>
        </div>
      </header>
      <Sidebar />
      <main className={`md:ml-60 pt-16 max-h-screen overflow-auto`}>
        {children}
      </main>
    </div>
  );
};

export default Base;
