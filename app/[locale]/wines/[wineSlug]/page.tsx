import FadeUp from "@/components/animations/FadeUp";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ wineSlug: string }>;
}) {
  const { wineSlug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wines/${wineSlug}`,
    { cache: "no-store" },
  );

  const wine = await res.json();

  return {
    title: wine.meta_title,
    description: wine.meta_description,
    openGraph: {
      title: wine.meta_title,
      description: wine.meta_description,
      images: [
        {
          url: `${wine.image}`,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ wineSlug: string; locale: string }>;
}) {
  const { wineSlug, locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("wines");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wines/${wineSlug}`,
    {
      cache: "no-store",
    },
  );
  const wine = await res.json();

  const details = [
    {
      id: 1,
      title: t("alc/Vol"),
      value: `${wine.alc}% / ${wine.vol}`,
    },
    {
      id: 2,
      title: t("year"),
      value: `${wine.year}`,
    },
    {
      id: 3,
      title: t("origin"),
      value: `${wine.origin}`,
    },
    {
      id: 4,
      title: t("serve"),
      value: `${wine.serve}`,
    },
  ];
  return (
    <div className="">
      <div className="bottom-curve bg-primary flex flex-col items-center max-md:pt-40 pt-70 max-md:pb-20 px-[16px] font-[family-name:var(--font-tribun)]">
        <h1 className="max-md:text-4xl text-6xl max-md:tracking-[10px] tracking-[20px] text-white text-center max-md:flex hidden">
          SHAKRIANI ESTATE
        </h1>
      </div>
      {/* wine details */}
      <div className="overflow-hidden relative py-30 flex flex-col items-center">
        <div className="absolute w-[2000px] h-[1000px] max-md:-mt-50 -mt-70 max-md:-mr-80 -mr-270 max-md:rotate-70 rotate-40">
          <Image
            src="/media/vazie.svg"
            alt="vazi image"
            fill
            className="object-contain opacity-15"
          />
        </div>
        <div className="absolute w-[2000px] h-[1000px] max-md:mt-230 mt-30 max-md:-ml-40 max-[1537px]:-ml-300 -ml-310">
          <Image
            src="/media/vazi.svg"
            alt="vazi image"
            fill
            className="object-contain opacity-15"
          />
        </div>
        <div className="grid max-md:grid-cols-1 px-[16px] grid-cols-2 gap-20 max-w-340 w-full">
          <FadeUp>
            <div className="relative w-full h-full aspect-square max-md:aspect-auto">
              {/* <Image
              src={`${wine.image}`}
              alt={`${wine.image_alt}`}
              fill
              className="object-contain"
            /> */}
              <img
                src={`${wine.image}`}
                alt={wine.image_alt}
                className="object-contain w-full h-full"
              />
            </div>
          </FadeUp>
          <FadeUp>
            <div className="rounded-[11px] border border-[#8E997E] bg-[#8E997E3D] max-md:px-[16px] p-15 flex flex-col items-center gap-[57px]">
              <h1 className="font-(family-name:--font-inter) text-[24px] font-extrabold text-primary tracking-[12px] uppercase">
                {wine.name}
              </h1>
              <div className="grid max-md:grid-cols-3 grid-cols-7 max-md:gap-10 items-center max-md:px-10 font-(family-name:--font-inter)">
                {details.map((detail, index) => {
                  const showDesktopDivider = index !== details.length - 1;

                  // max-md only after item 1 and 3 (indexes 0 and 2)
                  const showMobileDivider = index === 0 || index === 2;

                  return (
                    <div key={detail.id} className="contents">
                      <div className="py-3 flex flex-col items-center justify-center gap-[22px] text-center text-primary">
                        <p className="text-[14px] tracking-[5px] whitespace-nowrap">
                          {detail.title}
                        </p>
                        <p className="text-[12px] tracking-[4px] whitespace-nowrap">
                          {detail.value}
                        </p>
                      </div>

                      {showDesktopDivider && (
                        <div className="hidden md:block w-[1px] h-full bg-[#8E997E] mx-auto"></div>
                      )}
                      {showMobileDivider && (
                        <div className="block md:hidden w-[1px] h-full bg-[#8E997E] mx-auto"></div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="font-[family-name:var(--font-tribun)] text-primary font-bold tracking-[1px]">
                {wine.description}
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
