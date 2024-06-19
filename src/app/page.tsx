import ImageUploader from '@/components/imageUploader';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.mainContent}>
      <h1 className={styles.title}>Photo-Speare</h1>
      <h3 className={styles.subTitle}>Turn an image into a Shakespeare poem</h3>
      <ImageUploader />
    </main>
  );
}
