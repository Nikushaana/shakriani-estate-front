import Image from "next/image";
import HeaderPart from "./components/main page/headerPart";
import AboutBrand from "./components/main page/aboutBrand";
import Numbers from "./components/main page/numbers";
import OrderForm from "./components/main page/orderForm";
import OurWinesSlider from "./components/main page/ourWinesSlider";
import FadeUp from "./components/animations/FadeUp";

export default async function Home() {
  const winesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wines`, {
    cache: "no-store",
  });
  const wines = await winesRes.json();

  return (
    <div className="font-[family-name:var(--font-tribun)]">
      {/* header part  */}
      <HeaderPart />
      {/* about brand section */}
      <FadeUp>
        <AboutBrand />
      </FadeUp>
      {/* our wines */}
      <FadeUp>
        <OurWinesSlider wines={wines} />
      </FadeUp>
      {/* numbers */}
      <FadeUp>
        <Numbers />
      </FadeUp>
      {/* order form */}
      <FadeUp>
        <OrderForm />
      </FadeUp>
      {/* logo */}
      <FadeUp>
        <div className="h-[230px] relative my-[70px] mx-[16px]">
          <Image
            src="/media/logo.svg"
            alt="logo image"
            fill
            className="object-contain"
          />
        </div>
      </FadeUp>
    </div>
  );
}
