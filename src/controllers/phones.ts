// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import { getBestDiscounts, getNewest } from '../services/phones';

export const getNewestController = (req: Request, res: Response) => {
  const { amount } = req.body;

  res.send(getNewest(amount || 8));
};

export const getDiscountController = (req: Request, res: Response) => {
  const { amount } = req.body;

  res.send(getBestDiscounts(amount || 8));
};
