import Link from "next/link";
import styles from "./Home.module.css";

export const metadata = {
  title: "Home",
  description: "Find your perfect rental car with RentalCar.",
};

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>
          Find your perfect rental car
        </h1>

        <p className={styles.text}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog" className={styles.button}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}