import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div>
        <h1>Car not found</h1>
        <Link className="primaryButton" href="/catalog">
          Back to catalog
        </Link>
      </div>
    </section>
  );
}