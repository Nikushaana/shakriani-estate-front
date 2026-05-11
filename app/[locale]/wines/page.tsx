import FadeUp from "@/components/animations/FadeUp";
import OrderForm from "@/components/main page/orderForm";
import OurWines from "@/components/wines/ourWines";
import WinesHeader from "@/components/wines/winesHeader";
import { setRequestLocale } from "next-intl/server";

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

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div className="font-[family-name:var(--font-tribun)] pb-[40px]">
      {/* wines header */}
      <WinesHeader />
      {/* our wines */}
      <OurWines />
      {/* order form */}
      <FadeUp>
        <OrderForm />
      </FadeUp>
    </div>
  );
}
