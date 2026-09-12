import css from "./CarList.module.css";
import CarCard from "../CarCard/CarCard";
import { Car } from "@/types/car";

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  return (
    <ul className={css.list}>
      {cars.map(car => (
        <li key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CarList;
