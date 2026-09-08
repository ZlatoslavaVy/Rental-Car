import { Metadata } from "next";
import Image from "next/image";
import heroImage from "../public/hero_image.jpg";
import css from "@/app/Home.module.css";

export const metadata: Metadata = {
  title: "NoteHub Home",
  description:
    "NoteHub is a simple and efficient application designed for managing personal notes.",
  openGraph: {
    title: "NoteHub Home",
    description:
      "NoteHub is a simple and efficient application designed for managing personal notes.",
    url: "https://08-zustand-tawny-mu.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Home",
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <Image
          src={heroImage}
          alt="hero"
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          placeholder="blur"
        />
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.description}>Reliable and budget-friendly rentals for any journey</p>
        <button className={css.button}>View Catalog</button>
      </div>
    </main>
  );
}
