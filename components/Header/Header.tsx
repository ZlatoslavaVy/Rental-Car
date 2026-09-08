import Link from "next/link";
import css from "@/components/Header/Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink} aria-label="Home">
        Rental<span className={css.headerSpan}>Car</span>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/catalog" className={css.navigationLink}>
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
