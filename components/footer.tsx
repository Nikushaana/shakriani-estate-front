"use client";

import { Link } from "@/i18n/navigation";
import { useSharedStore } from "@/store/useSharedStore";
import { useTranslations } from "next-intl";
import { FiFacebook, FiInstagram } from "react-icons/fi";

export default function Footer() {
  const t = useTranslations("header");
  const t1 = useTranslations("footer");
  const { routes } = useSharedStore();

  const routes2 = [
    {
      id: 1,
      name: "termsAndConditions",
      route: "/",
    },
    {
      id: 2,
      name: "privacyPolicy",
      route: "/",
    },
  ];
  const socialMedia = [
    {
      id: 1,
      icon: <FiFacebook />,
      url: "https://www.facebook.com/profile.php?id=100076172315167",
    },
    {
      id: 2,
      icon: <FiInstagram />,
      url: "https://www.instagram.com/shakriani_estate/",
    },
  ];

  return (
    <div className="top-curve bg-primary text-white pt-30 flex flex-col gap-20 items-center justify-center">
      <div className="max-w-300 w-full flex flex-col items-center px-[16px]">
        <h1 className="max-md:w-auto w-full text-[20px] font-(family-name:--font-inter) font-bold">
          SHAKRIANI ESTATE
        </h1>
        <div className="grid max-md:grid-cols-1 grid-cols-3 max-md:gap-8 max-md:w-auto w-full max-md:my-8 my-5">
          <ul className="space-y-3">
            {routes.map((route) => (
              <li key={route.id}>
                <Link
                  href={`/${route.route}`}
                  className="font-(family-name:--font-inter) font-medium"
                >
                  {t(`${route.name}`)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {routes2.map((route) => (
              <li key={route.id}>
                <Link
                  href={`/${route.route}`}
                  className="font-(family-name:--font-inter) font-medium"
                >
                  {t1(`${route.name}`)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-3 justify-self-end">
            <ul className="space-y-3 max-md:text-left text-right font-(family-name:--font-inter) font-medium">
              <li>Kakheti, Georgia</li>
              <li>+995 123 456 789</li>
              <li>Info@shakrianiestate.ge</li>
            </ul>
            <div className="flex justify-center gap-[10px]">
              {socialMedia.map((media) => (
                <a
                  href={media.url}
                  key={media.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] rounded-md flex items-center justify-center text-[#D1D5DC] bg-[#8E997E40] transition-colors hover:bg-[#8E997E60]"
                >
                  {media.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-white max-md:w-full w-1/2" />
        <h1 className="py-3 text-[14px]">
          © {new Date().getFullYear()} Shakriani Estate |{" "}
          {t1("allRightsReserved")}
        </h1>
      </div>
    </div>
  );
}
