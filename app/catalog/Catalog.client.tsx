"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api/cars.service";
import { CarsParams } from "@/types/car";
import CarList from "@/components/CarList/CarList";

const CatalogClient = () => {
  const [filters] = useState<CarsParams>({});

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["catalog", filters],
    queryFn: ({ pageParam = 1 }) => fetchCars({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastResponse => {
      const nextPage = lastResponse.page + 1;
      return nextPage <= lastResponse.totalPages ? nextPage : undefined;
    },
  });

  const cars = data?.pages.flatMap(page => page.cars) || [];

  return (
    <section style={{ padding: "40px", fontFamily: "sans-serif" }}>
      {isLoading && <p>⏳ Завантажую машини...</p>}

      {!isLoading && cars.length > 0 && <CarList cars={cars} />}

      {hasNextPage && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetching}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3470ff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {isFetching ? "⏳ Вантажу ще..." : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default CatalogClient;
