function movingAverage(data: number[], windowSize: number) {
  if (data.length < windowSize) return null;
  let sum = 0;
  for (let i = data.length - windowSize; i < data.length; i++) {
    sum += data[i];
  }
  return sum / windowSize;
}

/**
 * @returns 1, if ascending, 0 if stable, -1 if descending trend
 */
export function detectTrend(data: number[], windowSize: number): number {
  let ma = movingAverage(data, windowSize);
  let lastValue = data[data.length - 1];

  if (ma == null || lastValue == ma) return 0;
  if (lastValue > ma) return 1;
  if (lastValue < ma) return -1;
  return 0;
}

export function differenceOfDays(dateA: Date, dateB: Date) {
  const oneDay = 1000 * 60 * 60 * 24;
  const diffMillis = Math.abs(
    Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate()) -
      Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate())
  );
  return Math.floor(diffMillis / oneDay);
}
