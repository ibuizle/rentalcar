import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--second-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RentalCar",
    template: "%s | RentalCar",
  },
  description:
    "RentalCar is a web application for finding and booking rental cars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}