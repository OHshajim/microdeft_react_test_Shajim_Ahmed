import styles from "./page.module.css";
import Card from "@/Components/Card";

export default async function Home() {
  return (
    <div className={styles.page}>
      <Card />
    </div>
  );
}
