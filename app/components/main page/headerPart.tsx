import Image from "next/image";

export default function HeaderPart() {
  return (
    <div className="relative flex flex-col items-center">
      <Image
        src="/media/wineyard.png"
        alt="Blog image"
        fill
        className="object-cover max-md:object-[40%_30%] object-top"
      />
      <div className="z-10 max-md:mt-0 max-[1600px]:mt-90 mt-120 mb-40 max-[1600px]:mb-30 max-md:mb-0 text-center max-md:h-screen max-md:flex max-md:flex-col max-md:justify-center text-white w-full">
        <h1 className="max-md:text-4xl text-8xl max-md:tracking-[10px] tracking-[20px]">SHAKRIANI ESTATE</h1>
        <h2 className="max-md:text-[38px] text-[48px] mt-14 tracking-[5px]">SINCE 2015</h2>
      </div>
    </div>
  );
}
