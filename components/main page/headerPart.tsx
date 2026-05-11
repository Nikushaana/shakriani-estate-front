"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HeaderPart() {
  const t = useTranslations('main');

  return (
    <div className="relative flex flex-col items-center">
      <Image
        src="/media/wineyard.png"
        alt="Blog image"
        fill
        className="object-cover max-md:object-[40%_30%] object-top"
      />
      <div className="z-10 max-md:mt-0 max-[1600px]:mt-90 mt-120 mb-40 max-[1600px]:mb-30 max-md:mb-0 text-center max-md:h-screen max-md:flex max-md:flex-col max-md:justify-center text-white w-full">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="max-md:text-4xl text-8xl max-md:tracking-[10px] tracking-[20px]"
        >
          SHAKRIANI ESTATE
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="max-md:text-[38px] text-[48px] mt-14 tracking-[5px]"
        >
          {t('header')}
        </motion.h2>
      </div>
    </div>
  );
}
