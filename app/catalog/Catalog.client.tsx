"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api/cars.service";
import { CarsParams } from "@/types/car";

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
      <h1>Тестовий Каталог (Перевірка API)</h1>

      {/* 1. ТИМЧАСОВИЙ ЛОАДЕР */}
      {isLoading && <p>⏳ Завантажую машини з бекенду...</p>}

      {/* 2. ТИМЧАСОВИЙ СПИСОК МАШИН */}
      {!isLoading && cars.length > 0 && (
        <ul style={{ display: "flex", flexDirection: "column", gap: "10px", padding: 0 }}>
          {cars.map(car => (
            <li
              key={car.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
                listStyle: "none",
              }}
            >
              <strong>
                {car.brand} {car.model}
              </strong>{" "}
              ({car.year}) — Ціна: {car.rentalPrice}
            </li>
          ))}
        </ul>
      )}

      {/* 3. ТИМЧАСОВА КНОПКА ЗАВАНТАЖЕННЯ */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetching}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#3470ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {isFetching ? "⏳ Вантажу ще..." : "Показати ще (Load More)"}
        </button>
      )}
    </section>
  );
};

export default CatalogClient;
