"use client";

import Image from "next/image";
import HeaderPart from "./components/main page/headerPart";
import AboutBrand from "./components/main page/aboutBrand";
import Numbers from "./components/main page/numbers";
import OrderForm from "./components/main page/orderForm";
import OurWinesSlider from "./components/main page/ourWinesSlider";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-tribun)]">
      {/* header part  */} 
      <HeaderPart />
      {/* about brand section */}
      <AboutBrand />
      {/* our wines */}
      <OurWinesSlider />
      {/* numbers */}
      <Numbers />
      {/* order form */}
      <OrderForm />
      {/* logo */}
      <div className="h-[230px] relative my-[70px] mx-[16px]">
        <Image
          src="/media/logo.svg"
          alt="logo image"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
