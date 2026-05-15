"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";

import type { Car } from "@/types/car";
import styles from "./CarCard.module.css";

type CarCardProps = {
  car: Car;
  priority?: boolean;
};

export default function CarCard({
  car,
  priority = false,
}: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    id,
    year,
    brand,
    model,
    type,
    img,
    rentalPrice,
    rentalCompany,
    location,
    mileage,
  } = car;

  const formattedMileage = mileage.toLocaleString("en-US");

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={img}
          alt={`${brand} ${model}`}
          fill
          priority={priority}
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
        />

        <button
          type="button"
          className={styles.favoriteButton}
          aria-label={
            isFavorite
              ? `Remove ${brand} ${model} from favorites`
              : `Add ${brand} ${model} to favorites`
          }
          onClick={() => setIsFavorite((prev) => !prev)}
        >
          <FiHeart
            className={`${styles.favoriteIcon} ${
              isFavorite ? styles.favoriteActive : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>
            {brand} <span className={styles.model}>{model}</span>, {year}
          </h2>

          <p className={styles.price}>${rentalPrice}</p>
        </div>

        <div className={styles.meta}>
          <span>{location.city}</span>
          <span>|</span>
          <span>{location.country}</span>
          <span>|</span>
          <span>{rentalCompany}</span>
          <span>|</span>
          <span>{type}</span>
          <span>|</span>
          <span>{formattedMileage} km</span>
        </div>

        <Link
          href={`/catalog/${id}`}
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}