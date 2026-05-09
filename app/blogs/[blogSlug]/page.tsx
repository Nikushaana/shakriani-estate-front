import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const { blogSlug } = await params;

  console.log(blogSlug);

  return (
    <div>
      <div
        className="bottom-curve bg-primary pt-70 max-md:pt-40"
      ></div>

      {/* logo */}
      <div className="h-[230px] relative max-md:my-0 my-[70px] mx-[16px]">
        <Image
          src="/media/logo.svg"
          alt="logo image"
          fill
          className="object-contain"
        />
      </div>

      {/* blog details */}
      <div className="overflow-hidden relative max-md:mb-30 max-md:my-0 my-30 flex flex-col items-center">
        <div className="absolute w-[400px] h-[400px] max-md:-mr-30 max-md:mt-10 -mr-360 rotate-150">
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

        <div className="max-w-340 w-full max-md:space-y-20 space-y-30 px-[16px]">
          <div className="flex flex-col items-center">
            <Image
              src="/media/wineyard.png"
              alt="vazi image"
              width={600}
              height={600}
              className="object-cover rounded-[10px] overflow-hidden"
            />
          </div>

          <p className="font-[family-name:var(--font-tribun)] text-primary font-medium tracking-[1px] text-[20px]">
            Lorem ipsum dolor sit amet consectetur. Adipiscing libero ultricies
            ipsum habitant tempor urna arcu nisl sit. Sed massa odio nunc id
            velit quis felis quam. Eu eleifend scelerisque cras nec at odio
            etiam blandit viverra. Enim aliquam sed dui lorem ut nisl. Pharetra
            semper augue integer est pharetra duis velit mi in. Lorem sed
            pellentesque tincidunt bibendum cras risus. Euismod sit tortor urna
            interdum pulvinar suspendisse ipsum. Nibh donec purus sagittis
            tortor eu dignissim enim cursus dis. Nisl varius ut tellus nunc.
            Felis quam cras massa non facilisis porta facilisis ut. Vulputate
            convallis proin turpis proin et. Molestie bibendum enim interdum
            ultricies hendrerit est. In eu consectetur suscipit senectus porta
            accumsan pellentesque sed. Id eget tincidunt quisque nunc egestas
            bibendum cursus. Sodales vitae in ac sed consequat ut tortor. Metus
            sed hac mauris ullamcorper. Elit commodo pellentesque magna at orci
            pellentesque eu. Venenatis consectetur lacus pulvinar bibendum amet
            interdum. Velit sed arcu congue dignissim auctor et enim porta.
          </p>
        </div>
      </div>
    </div>
  );
}
