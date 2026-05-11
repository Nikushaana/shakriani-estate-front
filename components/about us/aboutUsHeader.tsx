"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutUsHeader() {
  const t = useTranslations("aboutUs");

  return (
    <div className="bottom-curve bg-primary flex flex-col items-center py-50 pb-40">
      <div className="max-w-350 w-full space-y-15 text-white px-[16px]">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="max-md:text-4xl text-6xl max-md:tracking-[10px] tracking-[20px] text-center"
        >
          SHAKRIANI ESTATE
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="grid max-lg:grid-cols-1 grid-cols-2 gap-20"
        >
          <div className="relative rounded-[20px] max-sm:aspect-square max-lg:aspect-video overflow-hidden shadow shadow-gray-400">
            <Image
              src="/media/botleWine.png"
              alt="about us image"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-[24px] font-extrabold max-md:my-0 my-10 tracking-[1px] max-lg:px-[16px]">
            {t("header")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
