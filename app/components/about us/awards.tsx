import Image from "next/image";

type Award = {
  id: string;
  image: string;
  text: string;
  created_at: string;
  updated_at: string;
};

export default async function Awards() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/awards`, {
    cache: "no-store",
  });
  const awards = await res.json();

  return (
    <div className="relative flex flex-col items-center py-30 overflow-hidden">
      <div className="absolute w-[2000px] h-[1000px] max-md:-mt-80 -mt-50 max-md:-ml-250 -ml-370 -rotate-40">
        <Image
          src="/media/vazie.svg"
          alt="vazi image"
          fill
          className="object-contain opacity-15"
        />
      </div>
      <div className="absolute w-100 h-100 max-md:mt-170 mt-100 max-md:-mr-70 -mr-350 rotate-40">
        <Image
          src="/media/layer.svg"
          alt="vazi image"
          fill
          className="object-contain opacity-15"
        />
      </div>
      <div className="absolute w-[2000px] h-[1500px] max-md:mt-400 mt-200">
        <Image
          src="/media/vazi.svg"
          alt="vazi image"
          fill
          className="object-contain opacity-15"
        />
      </div>
      <div className="max-w-300 w-full text-center max-lg:space-y-10 space-y-30 px-[16px]">
        <h1 className="text-primary max-md:text-[36px] text-[48px] font-extrabold tracking-[20px] ">
          AWARDS
        </h1>
        {awards.map((award: Award, index: number) => {
          return (
            <div key={award.id} className="max-lg:space-y-10 space-y-30">
              <div
                className={`grid max-lg:grid-cols-1 grid-cols-2 max-lg:gap-0 gap-40`}
              >
                <div
                  className={`relative flex items-center justify-center aspect-square max-lg:aspect-video max-lg:mt-10 max-lg:order-0 ${index % 2 !== 0 ? "order-2" : ""}`}
                >
                  {/* <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${award.image}`}
                    alt={`${award.id}`}
                    fill
                    unoptimized
                    className="object-cover"
                  /> */}
                  <img
                    src={`${award.image}`}
                    alt={award.id}
                    className="object-contain max-w-full max-h-full rounded-[11px]"
                  />
                </div>
                <p
                  className={`text-[24px] text-start font-normal flex items-center max-lg:my-10 my-20 max-lg:px-[16px] text-secondary ${
                    index % 2 !== 0 ? "order-1" : ""
                  }`}
                >
                  {award.text}
                </p>
              </div>
              {awards.length - 1 !== index && (
                <hr className="max-md:w-[80%] w-100 mx-auto border-primary" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
