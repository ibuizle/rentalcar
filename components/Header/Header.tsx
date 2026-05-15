"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="RentalCar home">
          <Image
            src="/logo.svg"
            alt="RentalCar"
            width={104}
            height={16}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.link} ${
              pathname === "/" ? styles.active : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={`${styles.link} ${
              pathname.startsWith("/catalog") ? styles.active : ""
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}