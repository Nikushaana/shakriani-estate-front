"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

export default function OurWinesSlider({ wines }: any) {
  const [index, setIndex] = useState(0);

  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(2);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.ceil(wines.length / itemsPerSlide) - 1;

  const next = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="top-curve pb-20 pt-30 bg-primary flex flex-col gap-20 items-center justify-center">
      <h1 className="max-md:hidden text-[64px] text-white font-extrabold">
        Our Wines
      </h1>
      <div className="flex items-center justify-between max-md:gap-4 gap-10 w-full max-w-300 px-[16px]">
        {(itemsPerSlide == 1 ? wines.length > 1 : wines.length > 2) && (
          <button onClick={prev} className="cursor-pointer">
            <TfiArrowCircleLeft className="text-white text-3xl" />
          </button>
        )}
        <div className="overflow-hidden flex-1">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex gap-40 min-w-full justify-center"
              >
                {wines
                  .slice(
                    slideIndex * itemsPerSlide,
                    slideIndex * itemsPerSlide + itemsPerSlide,
                  )
                  .map((wine) => (
                    <Link
                      href={`/wines/${wine.slug}`}
                      key={wine.id}
                      className="rounded-[11px] overflow-hidden relative w-[284px] h-[426px]"
                    >
                      {/* <Image
                        src={`${wine.image}`}
                        alt={`${wine.image_alt}`}
                        fill
                        className="object-cover "
                      /> */}
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${wine.image}`}
                        alt={wine.image_alt}
                        className="object-cover opacity-80"
                      />
                      <div className="absolute bottom-10 left-8 border-l border-white pl-2 py-1">
                        <div className="bg-[#8E997E5C] px-1 w-[152px]">
                          <h2 className="text-[24px] text-white">
                            {wine.name}
                          </h2>
                          <p className="text-[15px] text-primary">
                            {wine.type}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          </div>
        </div>
        {(itemsPerSlide == 1 ? wines.length > 1 : wines.length > 2) && (
          <button onClick={next} className="cursor-pointer">
            <TfiArrowCircleRight className="text-white text-3xl" />
          </button>
        )}
      </div>
      <Link
        href={"/wines"}
        className="text-white bg-secondary hover:bg-[#64744C] focus:bg-[#44552B] duration-100 rounded-[10px] h-[50px] w-[300px] flex items-center justify-center gap-8"
      >
        <h2 className="text-[20px] font-medium">See More</h2>
        <FaArrowRightLong />
      </Link>
    </div>
  );
}
