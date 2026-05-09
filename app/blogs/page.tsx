import Image from "next/image";
import Blogs from "../components/blogs/blogs";

export async function generateMetadata() {
  return {
    title: "Blogs | shakriani-estate.ge",
    description: "Read the latest articles, news and updates from our blog.",
    openGraph: {
      title: "Blogs | shakriani-estate.ge",
      description: "Read the latest articles, news and updates from our blog.",
      images: [
        {
          url: "/media/SmallLogo.svg",
        },
      ],
    },
  };
}

export default function page() {
  return (
    <div className="font-[family-name:var(--font-tribun)] pb-30">
      <div className="bottom-curve bg-primary pt-70 max-md:pt-40"></div>
      {/* logo */}
      <div className="h-[230px] relative max-md:my-0 my-[70px] mx-[16px]">
        <Image
          src="/media/logo.svg"
          alt="logo image"
          fill
          className="object-contain"
        />
      </div>
      {/* blogs */}
      <Blogs />
    </div>
  );
}
