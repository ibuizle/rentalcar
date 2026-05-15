import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/cars";
import type { CarsQueryParams } from "@/types/car";

const PER_PAGE = 8;

export function useCars(filters: Omit<CarsQueryParams, "page" | "perPage">) {
  return useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) =>
      getCars({
        ...filters,
        page: pageParam,
        perPage: PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });
}