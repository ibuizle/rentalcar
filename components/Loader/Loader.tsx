import styles from "./Loader.module.css";

type LoaderProps = {
  text?: string;
  size?: "default" | "small";
};

export default function Loader({
  text = "Loading",
  size = "default",
}: LoaderProps) {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`} role="status">
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.car}>
          <div className={styles.roof} />
          <div className={styles.body} />
          <div className={styles.window} />
          <div className={styles.light} />
          <div className={styles.wheelLeft} />
          <div className={styles.wheelRight} />
        </div>

        <div className={styles.shadow} />
        <div className={styles.road} />
      </div>

      <p className={styles.text}>{text}</p>
    </div>
  );
}