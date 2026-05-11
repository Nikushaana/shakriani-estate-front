import Image from "next/image";

export default function WinesHeader() {
  return (
    <div
      className="bottom-curve bg-primary flex flex-col items-center gap-y-10 pt-50 max-md:pt-40 pb-40 max-md:pb-20 px-[16px]"
    >
      <div className="relative h-25 w-full max-md:hidden">
        <Image
          src="/media/SmallLogo.svg"
          alt="small logo image"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="max-md:text-4xl text-6xl max-md:tracking-[10px] tracking-[20px] text-white text-center">SHAKRIANI ESTATE</h1>
    </div>
  );
}
