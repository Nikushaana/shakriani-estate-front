import AboutUsHeader from "../components/about us/aboutUsHeader";
import Awards from "../components/about us/awards";

export async function generateMetadata() {
  return {
    title: "About Us | shakriani-estate.ge",
    description:
      "Learn more about our company, our mission, achievements and values.",
    openGraph: {
      title: "About Us | shakriani-estate.ge",
      description:
        "Learn more about our company, our mission, achievements and values.",
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
    <div className="font-[family-name:var(--font-tribun)] max-[1537px]:-mb-5 -mb-3">
      {/* header part */}
      <AboutUsHeader />
      {/* awards */}
      <Awards />
    </div>
  );
}
