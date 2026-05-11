import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutBrand() {
  const t = useTranslations('main');

  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      <div className="absolute max-md:-ml-80 max-[1537px]:-ml-240 max-[1537px]:-mt-15 -ml-260 -mt-25 max-md:h-[800px] h-[1200px] w-[2000px]">
        <Image
          src="/media/vazi.svg"
          alt="vazi image"
          fill
          className="object-contain opacity-15"
        />
      </div>
      <div className="text-primary max-w-300 w-full grid max-md:grid-cols-1 grid-cols-2 gap-10 py-40">
        <h1 className="max-md:text-[36px] text-[64px] font-extrabold flex items-center justify-center text-center">
          {t('aboutOurBrand')}
        </h1>
        <p className="max-md:text-[20px] text-[31.6px] font-extrabold tracking-[1px] max-md:px-10">
          {t('aboutOurBrandText')}
        </p>
      </div>
    </div>
  );
}
