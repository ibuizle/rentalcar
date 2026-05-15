import type { Metadata } from "next";

import Image from "next/image";
import { notFound } from "next/navigation";

import {
  MapPin,
  CircleCheck,
  Calendar,
  Car,
  Fuel,
  Gauge,
} from "lucide-react";

import { getCarById } from "@/lib/cars";

import RentalForm from "@/components/RentalForm/RentalForm";

import styles from "./Details.module.css";

export const metadata: Metadata = {
  title: "Car Details | RentalCar",
  description:
    "View detailed information about the selected rental car and book it online.",
};

type DetailsPageProps = {
  params: Promise<{
    carId: string;
  }>;
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { carId } = await params;

  const car = await getCarById(carId);

  if (!car) {
    notFound();
  }

  const location = car.location
    ? `${car.location.city}, ${car.location.country}`
    : "Location is not specified";

  return (
    <section className={styles.detailsPage}>
      <div className={styles.detailsLeft}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          className={styles.detailsImage}
          priority
        />

        <RentalForm carId={car.id} />
      </div>

      <div className={styles.detailsInfo}>
        <div className={styles.titleRow}>
          <h1>
            {car.brand} {car.model}, {car.year}
          </h1>

          <span className={styles.carId}>Id: {car.id.slice(0, 4)}</span>
        </div>

        <div className={styles.detailsLocation}>
          <span>
            <MapPin size={16} />
            {location}
          </span>

          <span>Mileage: {car.mileage.toLocaleString()} km</span>
        </div>

        <p className={styles.detailsPrice}>${car.rentalPrice}</p>

        <p className={styles.detailsDescription}>{car.description}</p>

        <div className={styles.detailsBlock}>
          <h2>Rental Conditions:</h2>

          <ul>
            {car.rentalConditions?.map((condition) => (
              <li key={condition}>
                <CircleCheck size={16} />
                {condition}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.detailsBlock}>
          <h2>Car Specifications:</h2>

          <ul>
            <li>
              <Calendar size={16} />
              Year: {car.year}
            </li>

            <li>
              <Car size={16} />
              Type: {car.type}
            </li>

            <li>
              <Fuel size={16} />
              Fuel Consumption: {car.fuelConsumption || "Not specified"}
            </li>

            <li>
              <Gauge size={16} />
              Engine: {car.engine || "Not specified"}
            </li>

            <li>
              <Gauge size={16} />
              Mileage: {car.mileage.toLocaleString()} km
            </li>
          </ul>
        </div>

        <div className={styles.detailsBlock}>
          <h2>Accessories and functionalities:</h2>

          <ul>
            {car.features?.length ? (
              car.features.map((feature) => (
                <li key={feature}>
                  <CircleCheck size={16} />
                  {feature}
                </li>
              ))
            ) : (
              <li>No features specified</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}