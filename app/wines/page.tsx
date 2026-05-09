import Image from "next/image";
import OrderForm from "../components/main page/orderForm";
import WinesHeader from "../components/wines/winesHeader";
import OurWines from "../components/wines/ourWines";

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
