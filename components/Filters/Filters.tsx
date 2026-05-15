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

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  useEffect(() => {
    async function loadFilters() {
      try {
        const data = await getCarFilters();
        setFiltersData(data);
      } catch {
        setFiltersData(null);
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

    setIsBrandOpen(false);
    setIsPriceOpen(false);

    onSubmit({
      ...(brand ? { brand } : {}),
      ...(price ? { price: Number(price) } : {}),
      ...(minMileage ? { minMileage: Number(minMileage) } : {}),
      ...(maxMileage ? { maxMileage: Number(maxMileage) } : {}),
    });
  }

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <span className={styles.label}>Car brand</span>

        <div className={styles.selectWrapper}>
          <button
            className={styles.selectButton}
            type="button"
            onClick={() => {
              setIsBrandOpen((prev) => !prev);
              setIsPriceOpen(false);
            }}
          >
            <span>{brand || "Choose a brand"}</span>

            <svg
              className={`${styles.selectIcon} ${
                isBrandOpen ? styles.selectIconOpen : ""
              }`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isBrandOpen && (
            <ul className={styles.optionsList}>
              <li>
                <button
                  className={styles.option}
                  type="button"
                  onClick={() => {
                    setBrand("");
                    setIsBrandOpen(false);
                  }}
                >
                  Choose a brand
                </button>
              </li>

              {filtersData?.brands.map((item) => (
                <li key={item}>
                  <button
                    className={styles.option}
                    type="button"
                    onClick={() => {
                      setBrand(item);
                      setIsBrandOpen(false);
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Price / 1 hour</span>

        <div className={styles.selectWrapper}>
          <button
            className={styles.selectButton}
            type="button"
            onClick={() => {
              setIsPriceOpen((prev) => !prev);
              setIsBrandOpen(false);
            }}
          >
            <span>{price ? `To $${price}` : "Choose a price"}</span>

            <svg
              className={`${styles.selectIcon} ${
                isPriceOpen ? styles.selectIconOpen : ""
              }`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isPriceOpen && (
            <ul className={styles.optionsList}>
              <li>
                <button
                  className={styles.option}
                  type="button"
                  onClick={() => {
                    setPrice("");
                    setIsPriceOpen(false);
                  }}
                >
                  Choose a price
                </button>
              </li>

              {priceOptions.map((item) => (
                <li key={item}>
                  <button
                    className={styles.option}
                    type="button"
                    onClick={() => {
                      setPrice(String(item));
                      setIsPriceOpen(false);
                    }}
                  >
                    To ${item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Car mileage / km</span>

        <div className={styles.mileageGroup}>
          <input
            className={styles.mileageInput}
            type="number"
            min="0"
            placeholder="From"
            value={minMileage}
            onChange={(event) => setMinMileage(event.target.value)}
          />

          <input
            className={styles.mileageInput}
            type="number"
            min="0"
            placeholder="To"
            value={maxMileage}
            onChange={(event) => setMaxMileage(event.target.value)}
          />
        </div>
      </div>

      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  );
}