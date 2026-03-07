import styles from '@/app/page.module.css';
import PriceTable from '@/app/pages/components/PriceTable';
import { getLatestPrices } from '@/lib/porssisahko';

export default async function Home() {
  const priceData = await getLatestPrices();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PriceTable priceData={priceData} />
      </main>
    </div>
  );
}
