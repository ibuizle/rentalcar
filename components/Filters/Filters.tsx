"use client";

import { FormEvent, useEffect, useState } from "react";
import { getCarFilters } from "@/lib/cars";
import type { CarsQueryParams, FiltersResponse } from "@/types/car";
import styles from "./Filters.module.css";

type FiltersProps = {
  onSubmit: (filters: Omit<CarsQueryParams, "page" | "perPage">) => void;
};

export default function Filters({ onSubmit }: FiltersProps) {
  const [filtersData, setFiltersData] = useState<FiltersResponse | null>(null);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  useEffect(() => {
    async function loadFilters() {
      try {
        const data = await getCarFilters();
        setFiltersData(data);
      } catch (error) {
        console.error("Failed to load filters", error);
      }
    }

    loadFilters();
  }, []);

  const priceOptions = filtersData
    ? Array.from(
        {
          length:
            Math.floor((filtersData.price.max - filtersData.price.min) / 10) +
            1,
        },
        (_, index) => filtersData.price.min + index * 10
      )
    : [];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      ...(brand ? { brand } : {}),
      ...(price ? { price: Number(price) } : {}),
      ...(minMileage ? { minMileage: Number(minMileage) } : {}),
      ...(maxMileage ? { maxMileage: Number(maxMileage) } : {}),
    });
  }

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <label>
        Car brand

        <select value={brand} onChange={(event) => setBrand(event.target.value)}>
          <option value="">Choose a brand</option>

          {filtersData?.brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label>
        Price / 1 hour

        <select value={price} onChange={(event) => setPrice(event.target.value)}>
          <option value="">Choose a price</option>

          {priceOptions.map((item) => (
            <option key={item} value={item}>
              To ${item}
            </option>
          ))}
        </select>
      </label>

      <label>
        Car mileage / km

        <input
          type="number"
          min="0"
          placeholder="From"
          value={minMileage}
          onChange={(event) => setMinMileage(event.target.value)}
        />
      </label>

      <label>
        &nbsp;

        <input
          type="number"
          min="0"
          placeholder="To"
          value={maxMileage}
          onChange={(event) => setMaxMileage(event.target.value)}
        />
      </label>

      <button className="primaryButton" type="submit">
        Search
      </button>
    </form>
  );
}