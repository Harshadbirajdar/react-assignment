import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useNavStore from "../../../store/nav";

interface MenuProps {
  href: string;
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
const Menu = ({ href, title, Icon }: MenuProps) => {
  const { setnavState } = useNavStore();
  const router = useRouter();
  return (
    <li>
      <Link href={href} passHref legacyBehavior>
        <a
          onClick={() => {
            setnavState(false);
          }}
          className={`flex items-center rounded-xl font-bold text-sm  py-3 px-4 ${
            router.pathname === href
              ? "bg-indigo-300 text-yellow-900"
              : "bg-white text-gray-900 hover:bg-indigo-50"
          }`}
        >
          <Icon className="h-6 mr-2 " />
          {title}
        </a>
      </Link>
    </li>
  );
};

export default Menu;
