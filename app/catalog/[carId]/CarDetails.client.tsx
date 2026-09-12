"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchCarById } from "@/lib/api/cars.service"; // Перевір, чи правильний шлях
import css from "./CarDetails.module.css";

const CarDetailsClient = () => {
  // Дістаємо ID з адресного рядка (у тебе папка називається [id] чи [carId]?)
  // Якщо папка [id], залишаємо id. Якщо [carId] - зміни на carId.
  const { carId } = useParams<{ carId: string }>();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>⏳ Завантажую деталі...</p>;
  }

  if (isError || !car) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>❌ Машину не знайдено або помилка.</p>
    );
  }

  return (
    <div className={css.container}>
      {/* ЛІВА КОЛОНКА (Фото + майбутня форма) */}
      <div className={css.leftSide}>
        <Image
          className={css.image}
          src={car.img || "/hero.jpg"}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={512}
          priority // Замість loading="eager" краще використовувати priority в Next.js
          style={{ objectFit: "cover" }}
        />

        {/* ТУТ ПОТІМ БУДЕ КОМПОНЕНТ ФОРМИ: <RentCarForm id={id} /> */}
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f3f3f2",
            borderRadius: "16px",
          }}
        >
          <p>Тут буде форма оренди (RentCarForm)</p>
        </div>
      </div>

      {/* ПРАВА КОЛОНКА (Усі деталі машини) */}
      <div className={css.detailsCarWrapper}>
        {/* 1. Заголовок (CarHeader) */}
        <div className={css.carHeader}>
          <h1 className={css.carModel}>
            {car.brand} {car.model}, {car.year}
          </h1>
          <span className={css.article}>id: {car.id}</span>
        </div>

        {/* 2. Локація (CarLocation) */}
        <div className={css.carLocation}>
          📍 {car.location?.city}, {car.location?.country}
        </div>

        {/* 3. Ціна та опис */}
        <p className={css.carPrice}>${car.rentalPrice}</p>
        <p className={css.carDescription}>{car.description}</p>

        {/* 4. Умови оренди (RentalConditions) */}
        <h3 className={css.sectionTitle}>Rental Conditions</h3>
        <ul className={css.list}>
          {car.rentalConditions?.map((condition, index) => (
            <li key={index} className={css.listItem}>
              ✓ {condition}
            </li>
          ))}
        </ul>

        <span className={css.divider} />

        {/* 5. Характеристики (CarSpecifications) */}
        <h3 className={css.sectionTitle}>Car Specifications</h3>
        <ul className={css.list}>
          <li className={css.listItem}>Year: {car.year}</li>
          <li className={css.listItem}>Type: {car.type}</li>
          <li className={css.listItem}>Fuel Consumption: {car.fuelConsumption}</li>
          <li className={css.listItem}>Engine Size: {car.engine}</li>
        </ul>

        <span className={css.divider} />

        {/* 6. Особливості (Features) */}
        <h3 className={css.sectionTitle}>Accessories and functionalities:</h3>
        <ul className={css.list}>
          {car.features?.map((feature, index) => (
            <li key={index} className={css.listItem}>
              ✦ {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarDetailsClient;
