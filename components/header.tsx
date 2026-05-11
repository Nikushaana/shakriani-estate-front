"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useSharedStore } from "@/store/useSharedStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import LocaleSwitcher from "./localeSwitcher";

export default function Header() {
  const t = useTranslations("header");

  const pathname = usePathname();
  const { routes, menu, toggleMenu } = useSharedStore();

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menu]);

  return (
    <div className="absolute top-[50px] left-1/2 -translate-x-1/2 z-30 h-[70px] p-[10px] max-w-300 w-full max-md:px-10 px-[70px] rounded-[20px] md:bg-[#5A675B80] text-white flex justify-between max-md:shadow-none shadow-[0_0_10px_rgba(140,140,140)]">
      <Link href={`/`} className="relative w-[41px]">
        <Image
          src="/media/SmallLogo.svg"
          alt="logo image"
          fill
          className="object-contain"
        />
      </Link>
      <ul className="max-md:hidden flex items-center gap-[32px]">
        {routes.map((route) => (
          <li
            key={route.id}
            className={`border-b border-transparent duration-100 
              cursor-pointer ${pathname.split("/")[1] == route.route ? "border-white " : "hover:border-white "}`}
          >
            <Link
              href={`/${route.route}`}
              className="font-(family-name:--font-inter) font-extrabold"
            >
              {t(`${route.name}`)}
            </Link>
          </li>
        ))}
      </ul>
      <LocaleSwitcher />
      <div
        onClick={toggleMenu}
        className={`bg-white h-full aspect-square rounded-[12px] max-md:flex hidden items-center justify-center text-black text-[25px] cursor-pointer`}
      >
        <div className={` duration-100 ${menu && "rotate-180"}`}>
          {menu ? <BsXLg /> : <MdMenu />}
        </div>
      </div>
    </div>
  );
}
