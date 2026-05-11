import OrderFormClient from "./orderFormClient";

export default async function OrderForm() {
  const bannerVideosRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bannerVideos`,
    {
      next: { revalidate: 3600 },
    },
  );
  const bannerVideos = await bannerVideosRes.json();

  return <OrderFormClient bannerVideos={bannerVideos} />;
}
