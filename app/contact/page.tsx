import OrderForm from "../components/main page/orderForm";

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

export default async function Page() {
  return (
    <div className="pb-[40px]">
      <div className="bottom-curve bg-primary pt-70 max-md:pt-40"></div>

      {/* contact details */}
      <div className="my-40 max-md:my-20 flex flex-col items-center">
        <div className="max-w-340 w-full space-y-10 px-[16px] font-[family-name:var(--font-tribun)] text-primary font-normal text-[20px]">
          <p className="">Tel: +995 599 97 77 18</p>
          <p className="">E-mail: tskhovrebadzenika16@gmail.com</p>
          <p className="">
            Address: Georgia, Telavi, Nikoloz Muskhelishvili N33
          </p>

          <iframe
            src="https://www.google.com/maps?q=41.996758158713796,45.58119775282978&t=k&z=17&output=embed"
            loading="lazy"
            className="w-full h-[380px] mt-30 rounded-[10px]"
          ></iframe>
        </div>
      </div>

      {/* order form */}
      <OrderForm />
    </div>
  );
}
