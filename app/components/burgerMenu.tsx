"use client";

import { useSharedStore } from "@/store/useSharedStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine } from "react-icons/ri";

export default function BurgerMenu() {
  const pathname = usePathname();
  const { routes, menu, toggleMenu } = useSharedStore();

  return (
    <div
      className={`fixed inset-0 bg-[#E7EEE7] w-screen h-dvh duration-100 flex flex-col items-end justify-between
    ${menu ? "z-20" : "-z-1 opacity-0"}`}
    >
      <ul className="bottom-curve bg-primary flex flex-col items-center gap-[32px] w-full pt-50 pb-20">
        {routes.map((route) => (
          <li
            key={route.id}
            onClick={toggleMenu}
            className={`border-b border-transparent duration-100 
              cursor-pointer ${pathname.split("/")[1] == route.route ? "border-white " : "hover:border-white "}`}
          >
            <Link
              href={`/${route.route}`}
              className="font-(family-name:--font-inter) font-extrabold text-white text-[20px]"
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-[5px] cursor-pointer mx-10 mb-20">
        <h1 className="font-(family-name:--font-inter) font-semibold">ENG</h1>
        <RiArrowDownSLine />
      </div>
    </div>
  );
}
