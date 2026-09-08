"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCarById } from "@/lib/api/notes";
import css from "@/components/NoteDetails/NoteDetails.module.css";

export default function CarDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
    refetchOnMount: false,
  });

  // Опрацювання стану завантаження
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  // Опрацювання помилки або відсутності нотатки
  if (isError || !car) {
    return <p>Something went wrong.</p>;
  }

  // Якщо дані є, відмальовуємо нотатку
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{car.model}</h2>
        </div>
        <p className={css.tag}>{car.tag}</p>
        <p className={css.content}>{car.content}</p>
        {/* Залежно від того, як поле дати називається у твоєму бекенді, 
            можливо, тут буде car.createdAt або car.date */}
        <p className={css.date}>{car.createdAt}</p>
      </div>
    </div>
  );
}
