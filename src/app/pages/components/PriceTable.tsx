'use client';

import { Fragment, useState } from 'react';

import styles from './PriceTable.module.css';

// Types
import { Price } from '@/types/Price';
import { TimeInterval } from '@/types/TimeInterval';
import filterPriceDataByInterval from '@/utils/filterPriceDataByInterval';

type PriceTableProps = {
  priceData: Price[];
};

export const TIME_INTERVALS: TimeInterval[] = [
  'eilen',
  'tänään',
  'huomenna',
  'kaikki',
];

export default function PriceTable({ priceData }: PriceTableProps) {
  const [timeInterval, setTimeInterval] = useState<TimeInterval>(
    TIME_INTERVALS[1],
  );

  const filteredPriceData = filterPriceDataByInterval(priceData, timeInterval);
  const maxPrice = Math.max(...filteredPriceData.map((item) => item.price));
  console.log(maxPrice);

  const now = new Date();

  return (
    <div className={styles.priceTable}>
      <h2>Pörssisähkön hinta</h2>

      <div className={styles.priceListVertical}>
        <div className={styles.intervalSelection}>
          {TIME_INTERVALS.map((interval, index) => (
            <div
              className={
                styles.timeIntervalButton +
                (timeInterval === interval ? ' ' + styles.selected : '')
              }
              key={index}
              onClick={() => setTimeInterval(interval)}
            >
              {interval}
            </div>
          ))}
        </div>

        <ul>
  {filteredPriceData.map((item, index) => {
    const startDate = new Date(item.startDate);

    const isNewDay =
      (timeInterval === TIME_INTERVALS[3] &&
      startDate.getHours() === 0 &&
      startDate.getMinutes() === 0) || (index === 0 && timeInterval ===TIME_INTERVALS[3]);

    return (
      <Fragment key={index}>
        {isNewDay && (
          <p className={styles.dateLabel}>{startDate.toLocaleDateString('fi-FI', {month: 'long', day: '2-digit'})}</p>
        )}

        <li
          className={
            now >= startDate && now <= new Date(item.endDate)
              ? styles.selectedPrice
              : ''
          }
          style={{
            background: `linear-gradient(to right, #550055 ${(
              (item.price / maxPrice) *
              100
            ).toFixed(0)}%, #2d002d 0%)`,
          }}
        >
          <div className={styles.priceTimeBlock}>
            <span className={styles.number}>
              {startDate.getHours().toString().padStart(2, '0')}:
              {startDate.getMinutes().toString().padStart(2, '0')} -{' '}
              {new Date(item.endDate)
                .getHours()
                .toString()
                .padStart(2, '0')}
              :
              {new Date(item.endDate)
                .getMinutes()
                .toString()
                .padStart(2, '0')}
            </span>
          </div>

          <span className={styles.number}>
            {item.price.toFixed(2)}
          </span>
          <span className={styles.units}>snt/kWh</span>
        </li>
      </Fragment>
    );
  })}
</ul>
      </div>
    </div>
  );
}
