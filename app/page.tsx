"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import css from "@/app/Home.module.css";

const Home = () => {
  const router = useRouter();

  return (
    <section className={css.wrapper}>
      <div className={css.textWrapper}>
        <h1 className={css.title}>Find your perfect rental car</h1>

        <p className={css.description}>Reliable and budget-friendly rentals for any journey</p>

        <Button className={css.viewCatalogButton} onClick={() => router.push("/catalog")}>
          View Catalog
        </Button>
      </div>
    </section>
  );
};

export default Home;
