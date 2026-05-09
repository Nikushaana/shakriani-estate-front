import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  const blogs = [
    {
      id: 1,
      image: "/media/wineyard.png",
      text: "Lorem ipsum dolor sit amet consectetur. Nibh enim amet tincidunt praesent et bibendum id pharetra integer. Sapien sit ornare eros aliquam iaculis amet. Gravida mattis pharetra justo dignissim. Non arcu lobortis risus bibendum venenatis tincidunt. Hendrerit lobortis massa in tortor. Donec risus at elementum id rhoncus sit. Sit at nec quisque vitae vitae mollis amet ut. Ultrices tincidunt et etiam adipiscing. At quis vel volutpat vulputate turpis dolor adipiscing.",
    },
    {
      id: 2,
      image: "/media/wineyard.png",
      text: "Lorem ipsum dolor sit amet consectetur. Nibh enim amet tincidunt praesent et bibendum id pharetra integer. Sapien sit ornare eros aliquam iaculis amet. Gravida mattis pharetra justo dignissim. Non arcu lobortis risus bibendum venenatis tincidunt. Hendrerit lobortis massa in tortor. Donec risus at elementum id rhoncus sit. Sit at nec quisque vitae vitae mollis amet ut. Ultrices tincidunt et etiam adipiscing. At quis vel volutpat vulputate turpis dolor adipiscing.",
    },
  ];
  return (
    <div className="flex flex-col items-center overflow-hidden py-10">
      <div className="max-w-300 w-full text-center max-md:space-y-20 space-y-30 z-10 px-[16px]">
        {blogs.map((blog, index) => {
          return (
            <div key={blog.id} className="max-md:space-y-20 space-y-30">
              <div key={blog.id} className="grid max-lg:grid-cols-1 grid-cols-2 gap-10">
                <div className="relative rounded-[10px] overflow-hidden w-full h-full max-md:aspect-square max-lg:aspect-video">
                  <Image
                    src={`${blog.image}`}
                    alt={`${blog.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="font-[family-name:var(--font-tribun)] z-10 flex flex-col items-center justify-center gap-y-10 bg-[#8E997E3D] border border-[#5A675B80] rounded-[10px] max-md:px-[20px] px-15 max-md:py-10 py-20">
                  <p className="text-primary text-[20px] text-start font-medium tracking-[2px]">
                    {blog.text}
                  </p>
                  <Link
                    href={`/blogs/${blog.text}`}
                    className="text-white bg-secondary hover:bg-[#64744C] focus:bg-[#44552B] duration-100 rounded-[10px] h-[50px] w-[240px] flex items-center justify-center cursor-pointer"
                  >
                    <h2 className="text-[20px] font-medium">VIEW</h2>
                  </Link>
                </div>
              </div>
              {blogs.length - 1 !== index && (
                <div className="relative">
                  <div className="absolute w-[2000px] h-[1000px] max-md:-mt-100 -mt-100 max-md:-ml-230 -ml-80">
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
