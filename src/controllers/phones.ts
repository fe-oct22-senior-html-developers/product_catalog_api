// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import {
  getBestDiscounts,
  getNewest,
  getPhonesAmount,
  findPhone,
  getRecommended,
} from '../services/phones';

export const getNewestController = (req: Request, res: Response) => {
  const { amount } = req.body;

  res.send(getNewest(amount || 8));
};

export const getDiscountController = (req: Request, res: Response) => {
  const { amount } = req.body;

  res.send(getBestDiscounts(amount || 8));
};

export const getPhonesAmountController = (req: Request, res: Response) => {
  res.send(String(getPhonesAmount()));
};

export const getPhoneInfoController = (req: Request, res: Response) => {
  const { phoneId } = req.params;

  fs.readFile(
    path.resolve(`./api/phones/${phoneId}.json`),
    'utf-8',
    (err, data) => {
      if (err) {
        res.sendStatus(404);

        return;
      }

      res.send(data);
    },
  );
};

export const getRecommendedController = (req: Request, res: Response) => {
  const { phoneId } = req.params;

  const foundPhone = findPhone(phoneId);

  if (!foundPhone) {
    res.sendStatus(404);

    return;
  }

  res.send(getRecommended(foundPhone));
};
