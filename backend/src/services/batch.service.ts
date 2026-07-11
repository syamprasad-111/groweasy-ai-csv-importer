export const createBatches = <T>(
  records: T[],
  batchSize: number = 25
): T[][] => {
  const batches: T[][] = [];

  for (let i = 0; i < records.length; i += batchSize) {
    batches.push(records.slice(i, i + batchSize));
  }

  return batches;
};