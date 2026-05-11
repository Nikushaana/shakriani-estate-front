"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsHeader() {
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
        <motion.div initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }} className="grid max-lg:grid-cols-1 grid-cols-2 gap-20">
          <div className="relative rounded-[20px] max-sm:aspect-square max-lg:aspect-video overflow-hidden shadow shadow-gray-400">
            <Image
              src="/media/botleWine.png"
              alt="about us image"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-[24px] font-extrabold max-md:my-0 my-10 tracking-[1px] max-lg:px-[16px]">
            At Shakriani Estate, winemaking is more than a profession – it is a
            family tradition passed down with pride and dedication. Located in
            the vineyards of Kakheti, our winery is built on respect for nature,
            patience, and a deep connection to Georgian wine culture. <br />
            <br />
            Each harvest represents the work of our family and our commitment to
            producing authentic wines. From the vineyards to the cellar, we
            carefully guide every stage of the process to ensure that every
            bottle carries the spirit of our land and the story of our family.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
