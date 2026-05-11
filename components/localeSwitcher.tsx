"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

const languages = [
  { code: "ka", label: "ქარ" },
  { code: "en", label: "ENG" },
  { code: "ru", label: "Рус" },
];

export default function LocaleSwitcher({ isBurgerMenu }: any) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((l) => l.code === locale);

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }

    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative flex ${isBurgerMenu ? "mr-5 mb-15" : "max-md:hidden"}`}
    >
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 cursor-pointer ${!isBurgerMenu && "text-white"}`}
      >
        <span className="font-medium">{currentLanguage?.label}</span>

        <BiChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute right-0 w-32
          rounded-2xl
          overflow-hidden
          bg-primary
          backdrop-blur-xl
          shadow-2xl
          transition-all duration-300 origin-top
          ${
            open
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }
              ${isBurgerMenu ? "-mt-37" : "mt-12 "}
        `}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={`cursor-pointer
              w-full text-left px-4 py-3
              text-sm text-white
              transition-all duration-200
              hover:bg-white/10
              ${locale === lang.code ? "bg-white/10 font-semibold" : ""}
            `}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
