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
  <Link href="/" className={pathname === "/" ? styles.active : undefined}>
    Home
  </Link>

  <Link
    href="/catalog"
    className={pathname === "/catalog" ? styles.active : undefined}
  >
    Catalog
  </Link>
</nav>
      </div>
    </header>
  );
}