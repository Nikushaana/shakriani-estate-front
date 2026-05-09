import Image from "next/image";

export default function Awards() {
  const awards = [
    {
      id: 1,
      image: "/media/wineyard.png",
      text: "Lorem ipsum dolor sit amet consectetur. Mauris faucibus neque scelerisque urna. Imperdiet ac magna elementum magna ut. Et pulvinar egestas in duis egestas adipiscing. Auctor elit vestibulum commodo in facilisis tellus amet scelerisque.",
    },
    {
      id: 2,
      image: "/media/wineyard.png",
      text: "Lorem ipsum dolor sit amet consectetur. Mauris faucibus neque scelerisque urna. Imperdiet ac magna elementum magna ut. Et pulvinar egestas in duis egestas adipiscing. Auctor elit vestibulum commodo in facilisis tellus amet scelerisque.",
    },
    {
      id: 3,
      image: "/media/wineyard.png",
      text: "Lorem ipsum dolor sit amet consectetur. Mauris faucibus neque scelerisque urna. Imperdiet ac magna elementum magna ut. Et pulvinar egestas in duis egestas adipiscing. Auctor elit vestibulum commodo in facilisis tellus amet scelerisque.",
    },
  ];

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
        <h1 className="text-primary max-md:text-[36px] text-[48px] font-extrabold tracking-[20px] ">AWARDS</h1>
        {awards.map((award, index) => {
          return (
            <div key={award.id} className="max-lg:space-y-10 space-y-30">
              <div className={`grid max-lg:grid-cols-1 grid-cols-2 max-lg:gap-0 gap-40`}>
                <div
                  className={`relative rounded-[11px] overflow-hidden max-lg:aspect-video max-lg:mt-10 max-lg:order-0 ${index % 2 !== 0 ? "order-2" : ""}`}
                >
                  <Image
                    src={`${award.image}`}
                    alt={`${award.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p
                  className={`text-[24px] text-start font-normal max-lg:my-10 my-20 max-lg:px-[16px] text-secondary ${
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
