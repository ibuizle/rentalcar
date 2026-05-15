"use client";

import { useMemo, useState } from "react";
import CarCard from "@/components/CarCard/CarCard";
import Filters from "@/components/Filters/Filters";
import Loader from "@/components/Loader/Loader";
import { useCars } from "@/hooks/useCars";
import type { CarsQueryParams } from "@/types/car";
import styles from "./Catalog.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState<
    Omit<CarsQueryParams, "page" | "perPage">
  >({});

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useCars(filters);

  const cars = useMemo(() => {
    return data?.pages.flatMap((page) => page.cars) || [];
  }, [data]);

  return (
    <section className={styles.catalogPage}>
      <Filters onSubmit={setFilters} />

      {isLoading && <Loader text="Loading cars..." />}

      {isError && (
        <p className={styles.statusMessage}>
          Failed to load cars.{" "}
          {(error as Error)?.message || "Try again later."}
        </p>
      )}

      {!isLoading && !isError && cars.length === 0 && (
        <p className={styles.statusMessage}>
          No cars found for these filters.
        </p>
      )}

      <div className={styles.carsGrid}>
        {cars.map((car, index) => (
          <CarCard
            key={car.id}
            car={car}
            priority={index < 4}
          />
        ))}
      </div>

      {isFetchingNextPage && (
        <Loader text="Loading more cars..." size="small" />
      )}

      {hasNextPage && (
        <button
          className="loadMoreButton"
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </section>
  );
}