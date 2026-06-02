import Image from "next/image";
import FadeUp from "../animations/FadeUp";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pickLocale } from "../wines/ourWines";

type Blog = {
  id: string;
  image: string;
  image_alt: string;
  image_alt_en: string;
  image_alt_ru: string;
  small_text: string;
  small_text_en: string;
  small_text_ru: string;
  text: string;
  text_en: string;
  text_ru: string;
  meta_title: string;
  meta_title_en: string;
  meta_title_ru: string;
  meta_description: string;
  meta_description_en: string;
  meta_description_ru: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export default async function Blogs() {
  const locale = (await getLocale()) as "ka" | "en" | "ru";
  const t = await getTranslations("wines");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
    cache: "no-store",
  });
  const blogs = await res.json();

  return (
    <div className="flex flex-col items-center overflow-hidden py-10">
      <div className="max-w-300 w-full text-center max-md:space-y-20 space-y-30 px-[16px]">
        {blogs.map((blog: Blog, index: number) => {
          return (
            <div key={blog.id} className="max-md:space-y-20 space-y-30">
              <div className="grid max-lg:grid-cols-1 grid-cols-2 items-center gap-10 z-10">
                <FadeUp>
                  <div className="relative rounded-[10px] overflow-hidden max-h-[600px] w-full h-full max-md:aspect-square max-lg:aspect-video">
                    <img
                      src={`${blog.image}`}
                      alt={pickLocale(
                        blog.image_alt,
                        blog.image_alt_en,
                        blog.image_alt_ru,
                        locale,
                      )}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </FadeUp>
                <FadeUp>
                  <div className="font-[family-name:var(--font-tribun)] z-10 flex flex-col items-center justify-center gap-y-10 bg-[#8E997E3D] border border-[#5A675B80] rounded-[10px] max-md:px-[20px] px-15 max-md:py-10 py-20">
                    <p className="text-primary text-[20px] text-start font-medium tracking-[2px]">
                      {pickLocale(
                        blog.small_text,
                        blog.small_text_en,
                        blog.small_text_ru,
                        locale,
                      )}
                    </p>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-white bg-secondary hover:bg-[#64744C] focus:bg-[#44552B] duration-100 rounded-[10px] h-[50px] w-[240px] flex items-center justify-center cursor-pointer"
                    >
                      <h2 className="text-[20px] font-medium">{t("view")}</h2>
                    </Link>
                  </div>
                </FadeUp>
              </div>

              {blogs.length - 1 !== index && (
                <div className="relative">
                  <div className="absolute -z-1 w-[2000px] h-[1000px] max-md:-mt-100 -mt-100 max-md:-ml-230 -ml-80">
                    <Image
                      src="/media/vazi.svg"
                      alt="vazi image"
                      fill
                      className="object-contain opacity-15"
                    />
                  </div>
                  <hr className="w-100 max-md:w-full mx-auto border-primary" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
