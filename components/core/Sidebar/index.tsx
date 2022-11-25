import Menu from "./Menu";
import { HomeModernIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useNavStore from "../../../store/nav";

const Sidebar = () => {
  const { navState, setnavState } = useNavStore();
  return (
    <div
      className={`${
        navState
          ? `opacity-100 z-[9999] `
          : "opacity-0 md:opacity-100 -z-50 md:z-auto "
      } md:block transition-all duration-700 ease-in-out fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="px-4 py-6 text-center border-b flex items-center justify-center">
            <XMarkIcon
              onClick={() => {
                setnavState(false);
              }}
              className="w-7 mr-5 md:hidden"
            />
            <h1 className="text-xl font-bold leading-none">
              <span className="text-indigo-700">Tehsil</span> App
            </h1>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              <Menu href="/" title="Dashboard" Icon={HomeModernIcon} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
