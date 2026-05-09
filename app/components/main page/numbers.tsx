import Image from "next/image";

export default function Numbers() {
  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      <div className="absolute max-md:mt-0 -mt-100 max-md:mr-30 -mr-240 max-md:-rotate-60 -rotate-15 h-[1000px] w-[2000px]">
        <Image
          src="/media/vazie.svg"
          alt="vazie image"
          fill
          className="object-contain opacity-15"
        />
      </div>
      <div className="z-10 max-w-300 w-full grid max-md:grid-cols-1 grid-cols-3 gap-10 py-30">
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-[80px]">4</h1>
          <h2 className="text-secondary text-[30px] text-center font-medium">
            Years in <br /> Business
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-[80px]">15</h1>
          <h2 className="text-secondary text-[30px] font-medium">Awards</h2>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-[80px]">400</h1>
          <h2 className="text-secondary text-[30px] text-center font-medium">
            Annual <br /> Production
          </h2>
        </div>
      </div>
    </div>
  );
}
