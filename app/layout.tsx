import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";

export const metadata: Metadata = {
  title: {
    default: "RentalCar",
    template: "%s | RentalCar",
  },
  description: "RentalCar is a web application for finding and booking rental cars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}