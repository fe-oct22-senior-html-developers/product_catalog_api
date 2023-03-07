import fs from 'fs';
import path from 'path';

const phones = JSON.parse(
  fs.readFileSync(path.resolve('./api/phones.json'), 'utf-8'),
);

export const getNewest = (amount) => {
  const sortedByYear = [...phones].sort((p1, p2) => p2.year - p1.year);

  return sortedByYear.slice(0, amount);
};

export const getBestDiscounts = (amount) => {
  const sortedByDiscounts = [...phones].sort((p1, p2) => {
    const p1Discount = (p1.price * 100) / p1.fullPrice;
    const p2Discount = (p2.price * 100) / p2.fullPrice;

    return p1Discount - p2Discount;
  });

  return sortedByDiscounts.slice(0, amount);
};
