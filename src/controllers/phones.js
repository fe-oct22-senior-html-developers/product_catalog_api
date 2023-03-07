import { getBestDiscounts, getNewest } from '../services/phones.js';

export const getNewestController = (req, res) => {
  const { amount } = req.body;

  res.send(getNewest(amount || 8));
};

export const getDiscountController = (req, res) => {
  const { amount } = req.body;

  res.send(getBestDiscounts(amount || 8));
};
