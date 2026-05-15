"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.logo}
        aria-label="RentalCar home"
        prefetch={false}
      >
        <Image src="/logo.svg" alt="RentalCar" width={104} height={16} />
      </Link>

      <nav className={styles.nav}>
        <Link
          href="/"
          prefetch={false}
          className={pathname === "/" ? styles.active : undefined}
        >
          Home
        </Link>

        <Link
          href="/catalog"
          prefetch={false}
          className={pathname.startsWith("/catalog") ? styles.active : undefined}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}