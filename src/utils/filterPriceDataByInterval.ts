import { Price } from '@/types/Price';
import { TimeInterval } from '@/types/TimeInterval';
import { TIME_INTERVALS } from '@/app/pages/components/PriceTable';

export default function filterPriceDataByInterval(
    data: Price[],
    interval: TimeInterval,
  ): Price[] {
    const now = new Date();

    // Start of today (00:00)
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    // Start of tomorrow
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(todayStart.getDate() + 1);

    // Start of yesterday
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);

    let start: Date;
    let end: Date;



    switch (interval) {
      case TIME_INTERVALS[0]:
        start = yesterdayStart;
        end = todayStart;
        break;

      case TIME_INTERVALS[1]:
        start = todayStart;
        end = tomorrowStart;
        break;

      case TIME_INTERVALS[2]:
        start = tomorrowStart;
        end = new Date(tomorrowStart.getTime() + 24 * 60 * 60 * 1000);
        break;

      case TIME_INTERVALS[3]:
        return data;
    }

    return data.filter((item) => {
      const itemDate = new Date(item.startDate);
      return itemDate >= start && itemDate < end;
    });
  }