import Image from "next/image";
import { Wine } from "../main page/ourWinesSlider";
import FadeUp from "../animations/FadeUp";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function OurWines() {
  const t = await getTranslations("main");
  const t1 = await getTranslations("wines");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wines`, {
    cache: "no-store",
  });
  const wines = await res.json();

  return (
    <div className="relative flex flex-col items-center py-40 overflow-hidden">
      <div className="absolute w-[2000px] h-[1000px] -mt-70 max-md:-mr-150 -mr-300 rotate-40">
        <Image
          src="/media/vazie.svg"
          alt="vazi image"
          fill
          className="object-contain opacity-15"
        />
      </div>
      <div className="absolute w-[1000px] h-[500px] max-md:rotate-150 -rotate-15 max-md:mt-350 mt-150 max-md:ml-40 -ml-350">
        <Image
          src="/media/layer.svg"
          alt="vazi image"
          fill
          className="object-contain opacity-15"
        />
      </div>
      <div className="absolute w-[1000px] h-[500px] max-md:mt-600 mt-280 max-md:mr-0 -mr-140 -rotate-140">
        <Image
          src="/media/layer.svg"
          alt="vazi image"
          fill
          className="object-contain opacity-15"
        />
      </div>

      <div className="max-w-300 w-full text-center max-md:space-y-10 space-y-30 z-10 px-[16px]">
        <FadeUp>
          <h1 className="text-primary text-[48px] max-md:text-[32px] max-md:tracking-[15px] tracking-[20px] font-extrabold">
            {t("ourWines")}
          </h1>
        </FadeUp>
        <div className="grid max-md:grid-cols-1 grid-cols-2 gap-40">
          {wines.map((wine: Wine) => (
            <FadeUp key={wine.id}>
              <div className="grid max-md:grid-cols-1 grid-cols-2 gap-2">
                <div className="relative flex items-center justify-center">
                  {/* <Image
                  src={`${wine.image}`}
                  alt={`${wine.image_alt}`}
                  height={600}
                  width={600}
                  className="object-contain h-[426px]"
                /> */}
                  <img
                    src={`${wine.image}`}
                    alt={wine.image_alt}
                    className="object-contain h-[426px]"
                  />
                </div>
                <div className="font-(family-name:--font-inter) flex flex-col items-start justify-center max-md:mx-auto max-md:w-60">
                  <h1 className="text-primary text-[20px] font-normal uppercase">
                    {wine.name}
                  </h1>
                  <p className="text-secondary text-[13px] font-normal mt-[15px] uppercase">
                    {wine.type}
                  </p>
                  <p className="text-secondary text-[12px] font-normal mt-[10px]">
                    {wine.year}
                  </p>
                  <p className="text-secondary text-[13px] font-normal mt-[50px]">
                    {wine.price} GEL
                  </p>
                  <Link
                    href={`/wines/${wine.slug}`}
                    className="text-white bg-secondary hover:bg-[#64744C] focus:bg-[#44552B] duration-100 rounded-[10px] h-[50px] w-full flex items-center justify-center mt-[15px] cursor-pointer"
                  >
                    <h2 className="text-[20px] font-medium">{t1("view")}</h2>
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
