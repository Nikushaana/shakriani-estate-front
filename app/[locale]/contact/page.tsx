import OrderForm from "@/components/main page/orderForm";
import FadeUp from "../../../components/animations/FadeUp";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  return {
    title: "Contact | shakriani-estate.ge",
    description:
      "Get in touch with us. Find our phone number, email, address and location.",
    openGraph: {
      title: "Contact | shakriani-estate.ge",
      description:
        "Get in touch with us. Find our phone number, email, address and location.",
      images: [
        {
          url: "/media/SmallLogo.svg",
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("main");

  return (
    <div className="pb-[40px]">
      <div className="bottom-curve bg-primary pt-70 max-md:pt-40"></div>

      {/* contact details */}
      <div className="my-40 max-md:my-20 flex flex-col items-center">
        <div className="max-w-340 w-full space-y-10 px-[16px] font-[family-name:var(--font-tribun)] text-primary font-normal text-[20px]">
          <FadeUp>
            <p className="">{t("mob")}: +995 599 977 718</p>
          </FadeUp>
          <FadeUp>
            <p className="">{t("email")}: shakrianiestate@gmail.com</p>
          </FadeUp>
          <FadeUp>
            <p className="">
              {t("address")}: Georgia, Telavi, Niko Muskhelishvili N33
            </p>
          </FadeUp>

          <FadeUp>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296.65102954307594!2d45.4903215829485!3d41.911197656435455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404433bb794ff943%3A0x5f99571b1d9aadfa!2sShakriani%20Estate%20Winery!5e1!3m2!1sen!2sge!4v1779359285559!5m2!1sen!2sge"
              loading="lazy"
              className="w-full h-[380px] mt-30 rounded-[10px]"
            ></iframe>
          </FadeUp>
        </div>
      </div>

      {/* order form */}
      <FadeUp>
        <OrderForm />
      </FadeUp>
    </div>
  );
}
