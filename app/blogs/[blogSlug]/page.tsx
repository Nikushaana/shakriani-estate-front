import FadeUp from "@/app/components/animations/FadeUp";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const { blogSlug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogSlug}`,
    { cache: "no-store" },
  );

  const blog = await res.json();

  return {
    title: blog.meta_title,
    description: blog.meta_description,
    openGraph: {
      title: blog.meta_title,
      description: blog.meta_description,
      images: [
        {
          url: `${blog.image}`,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const { blogSlug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogSlug}`,
    {
      cache: "no-store",
    },
  );
  const blog = await res.json();

  return (
    <div>
      <div className="bottom-curve bg-primary pt-70 max-md:pt-40"></div>

      {/* logo */}
      <FadeUp>
        <div className="h-[230px] relative max-md:my-0 my-[70px] mx-[16px]">
          <Image
            src="/media/logo.svg"
            alt="logo image"
            fill
            className="object-contain"
          />
        </div>
      </FadeUp>

      {/* blog details */}
      <div className="overflow-hidden relative max-md:pb-30 max-md:my-0 my-30 flex flex-col items-center">
        <div className="absolute w-[400px] h-[400px] max-md:-mr-30 max-md:mt-10 -mr-360 rotate-150 z-0">
          <Image
            src="/media/layer.svg"
            alt="vazi image"
            fill
            className="object-contain opacity-15"
          />
        </div>
        <div className="absolute w-[2000px] h-[1000px] max-md:mt-140 mt-30 max-md:-ml-50 -ml-300">
          <Image
            src="/media/vazi.svg"
            alt="vazi image"
            fill
            className="object-contain opacity-15"
          />
        </div>

        <div className="max-w-340 w-full max-md:space-y-20 space-y-30 px-[16px] ">
          <FadeUp>
            <div className="flex flex-col items-center ">
              {/* <Image
              src={`${blog.image}`}
              alt={`${blog.image_alt}`}
              width={600}
              height={600}
              className="object-cover rounded-[10px] overflow-hidden"
              /> */}
              <img
                src={`${blog.image}`}
                alt={blog.image_alt}
                className="object-cover rounded-[10px] max-h-[500px] z-10"
              />
            </div>
          </FadeUp>

          <FadeUp>
            <p className="font-[family-name:var(--font-tribun)] text-primary font-medium tracking-[1px] text-[20px]">
              {blog.text}
            </p>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
