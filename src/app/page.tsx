import ImageUploader from "@/components/imageUploader";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.mainContent}>
      <h1 className={styles.title}>Photo-Speare</h1>
      <h3 className={styles.subTitle}>Turn an image into a Shakespeare poem</h3>
      <ImageUploader />
      <p className={styles.poem}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        sapiente error iste, ea molestiae non perspiciatis repellat
        voluptatibus? Tenetur nisi magnam voluptates illum voluptatibus deleniti
        doloribus facilis culpa porro, voluptas rerum modi quis numquam
        aspernatur ut commodi fuga placeat architecto quia quisquam quo corrupti
        maiores.
      </p>
    </main>
  );
}
