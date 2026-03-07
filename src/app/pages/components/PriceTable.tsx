import styles from './PriceTable.module.css';
import { Price } from '@/lib/porssisahko';

type PriceTableProps = {
  priceData: Price[];
};

export default function PriceTable({ priceData }: PriceTableProps) {
  return (
    <div className={styles.priceTable}>
      <h2>Price Table</h2>
      {priceData.map((item, index) => (
        <div key={index} className={styles.priceRow}>
          <div className={styles.priceCell}>{item.price} cent/kWh</div>
          <div className={styles.priceCell}>
            {new Date(item.startDate).toLocaleString()}
          </div>
          <div className={styles.priceCell}>
            {new Date(item.endDate).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
