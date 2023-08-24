export class DateTimeUtils {
  static timeToSeconds(time?: any) {
    const outputTime = time ? new Date(time) : new Date();
    return +Math.floor(outputTime.getTime() / 1000).toFixed(0);
  }

  static secondsToTime(time: any) {
    return new Date(time * 1000);
  }

  static inspect(time: number | Date) {
    const thisTime = new Date(time);
    const year = thisTime.getFullYear();
    const month = thisTime.getMonth();
    const date = thisTime.getDate();
    const startDate = new Date(year, month, date);
    const endDate = new Date(year, month, date, 23);

    return {
      year,
      month,
      date,
      startDate,
      endDate,
    };
  }
}
