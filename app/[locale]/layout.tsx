import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Footer from "@/components/footer";
import BurgerMenu from "@/components/burgerMenu";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Shakriani estate",
  description: "shakriani estate descriprion",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const tribun = localFont({
  src: "../../fonts/TribunADFStd-Medium.otf",
  variable: "--font-tribun",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale)

  return (
    <html className={`${inter.variable} ${tribun.variable}`}>
      <body className="bg-[#E7EEE7]">
        <NextIntlClientProvider>
          <Header />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Footer />

          <BurgerMenu />

          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
