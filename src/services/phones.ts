/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { Phone } from '../types/phone';

const phones: Phone[] = JSON.parse(
  fs.readFileSync(path.resolve('./api/phones.json'), 'utf-8'),
);

export const getPhonesWithPagination = (
  sortBy: any,
  itemsNum: any,
  page: any,
) => {
  const phonesCopy = [...phones];

  switch (sortBy) {
    case 'priceLowest':
      phonesCopy.sort((p1, p2) => p1.price - p2.price);
      break;
    case 'priceHighest':
      phonesCopy.sort((p1, p2) => p2.price - p1.price);
      break;
    case 'newest':
      phonesCopy.sort((p1, p2) => p2.year - p1.year);
      break;
    case 'oldest':
      phonesCopy.sort((p1, p2) => p1.year - p2.year);
      break;
    default:
      phonesCopy.sort((p1, p2) => p1.name.localeCompare(p2.name));
      break;
  }

  return phonesCopy.slice(+itemsNum * +page - +itemsNum, +itemsNum * +page);
};

export const findPhone = (phoneId: string) =>
  phones.find((phone) => phone.phoneId === phoneId);

export const getNewest = (amount: number) => {
  const sortedByYear = [...phones].sort((p1, p2) => p2.year - p1.year);

  return sortedByYear.slice(0, amount);
};

export const getBestDiscounts = (amount: number) => {
  const sortedByDiscounts = [...phones].sort((p1, p2) => {
    const p1Discount = (p1.price * 100) / p1.fullPrice;
    const p2Discount = (p2.price * 100) / p2.fullPrice;

    return p1Discount - p2Discount;
  });

  return sortedByDiscounts.slice(0, amount);
};

export const getPhonesAmount = () => phones.length;

export const getRecommended = (foundPhone: Phone) => {
  const { phoneId, color, capacity } = foundPhone;

  return phones
    .filter(
      (phone) =>
        // eslint-disable-next-line operator-linebreak
        phone.phoneId !== phoneId &&
        (phone.capacity === capacity || phone.color === color),
    )
    .slice(0, 8);
};
