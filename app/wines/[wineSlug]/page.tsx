import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ wineSlug: string }>;
}) {
  const { wineSlug } = await params;

  console.log(wineSlug);

  const details = [
    {
      id: 1,
      title: "Alc / Vol",
      value: "14% / 75",
    },
    {
      id: 2,
      title: "Year",
      value: "2024",
    },
    {
      id: 3,
      title: "Origin",
      value: "Georgia",
    },
    {
      id: 4,
      title: "Serve",
      value: "15°C - 17°C",
    },
  ];
  return (
    <div>
      <div
        className="bottom-curve bg-primary flex flex-col items-center max-md:pt-40 pt-70 max-md:pb-20 px-[16px] font-[family-name:var(--font-tribun)]"
      >
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
        <div className="absolute w-[2000px] h-[1000px] max-md:mt-230 mt-30 max-md:-ml-40 -ml-300">
          <Image
            src="/media/vazi.svg"
            alt="vazi image"
            fill
            className="object-contain opacity-15"
          />
        </div>
        <div className="grid max-md:grid-cols-1 px-[16px] grid-cols-2 gap-20 max-w-340 w-full">
          <div className="relative w-full max-md:aspect-square">
            <Image
              src="/media/wine1.svg"
              alt="vazi image"
              fill
              className="object-contain"
            />
          </div>
          <div className="rounded-[11px] border border-[#8E997E] bg-[#8E997E3D] max-md:px-[16px] p-15 flex flex-col items-center gap-[57px]">
            <h1 className="font-(family-name:--font-inter) text-[24px] font-extrabold text-primary tracking-[12px]">
              SAPERAVI
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
              This Saperavi expresses the depth and natural structure
              characteristic of Qvevri wine. The aroma blends mineral notes,
              spices, and red berries, creating a multilayered, characterful,
              and harmonious bouquet. The style is pronounced and natural, with
              aromas that gradually unfold and gain depth. <br /> <br /> The
              palate is distinguished by soft tannins and a well-balanced
              structure, lending the wine silkiness and elegance. Its medium
              body and integrated texture create a harmonious profile that
              transitions into a clean, medium-length finish. The Kakhetian
              style is presented here in a traditional yet refined
              interpretation of Qvevri winemaking. <br /> <br /> It pairs
              ideally with grilled meats, eggplant with walnuts (badrijani),
              vegetable-based dishes, and cheese.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
