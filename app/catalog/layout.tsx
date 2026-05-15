import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | RentalCar",
  description:
    "Browse available rental cars, filter by brand, price, and mileage.",
};

type CatalogLayoutProps = {
  children: React.ReactNode;
};

export default function CatalogLayout({
  children,
}: CatalogLayoutProps) {
  return children;
}