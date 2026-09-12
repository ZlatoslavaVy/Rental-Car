import css from "./CarCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className={css.card}>
      {/* 
        Оскільки у тебе у фігмі фіксована ширина/висота для картинки,
        найкраще задати їх тут прямо, або використати fill + обгортку.
        Для простоти поки підставимо ширину/висоту з макета (подивись у фігмі точні цифри) 
      */}
      <Image
        src={car.img || "/hero.jpg"}
        alt={car.brand}
        width={244} // Зміни на свої цифри
        height={244} // Зміни на свої цифри
        className={css.image}
      />

      <div className={css.info}>
        <div className={css.header}>
          <h2 className={css.title}>{car.brand}</h2>
          <span className={css.model}>
            {car.model}, {car.year}
          </span>
          <span className={css.price}>${car.rentalPrice}</span>
        </div>

        {/* ... твої details і деталі ... */}

        <Link href={`/catalog/${car.id}`} target="_blank" className={css.link}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
