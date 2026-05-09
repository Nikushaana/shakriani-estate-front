import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import Header from "./components/header";
import BurgerMenu from "./components/burgerMenu";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Shakriani estate",
  description: "shakriani estate descriprion",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const tribun = localFont({
  src: "../fonts/TribunADFStd-Medium.otf",
  variable: "--font-tribun",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${tribun.variable}`}>
      <body className="bg-[#E7EEE7]">
        <Header />
        {children}
        <Footer />

        <BurgerMenu />
      </body>
    </html>
  );
}
