import OrderForm from "../components/main page/orderForm";
import WinesHeader from "../components/wines/winesHeader";
import OurWines from "../components/wines/ourWines";

export async function generateMetadata() {
  return {
    title: "Wines | shakriani-estate.ge",
    description:
      "Discover our premium wines collection from Shakriani Estate. Explore quality wines crafted in Georgia.",
    openGraph: {
      title: "Wines | shakriani-estate.ge",
      description:
        "Discover our premium wines collection from Shakriani Estate. Explore quality wines crafted in Georgia.",
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
    <div className="font-[family-name:var(--font-tribun)] pb-[40px]">
      {/* wines header */}
      <WinesHeader />
      {/* our wines */}
      <OurWines />
      {/* order form */}
      <OrderForm />
    </div>
  );
}
