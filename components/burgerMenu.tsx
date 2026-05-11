"use client";

import { Link } from "@/i18n/navigation";
import { useSharedStore } from "@/store/useSharedStore";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "./localeSwitcher";
import { useTranslations } from "next-intl";

export default function BurgerMenu() {
  const t = useTranslations("header");
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
              {t(`${route.name}`)}
            </Link>
          </li>
        ))}
      </ul>

      <LocaleSwitcher isBurgerMenu={true} />
    </div>
  );
}
