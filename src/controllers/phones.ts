// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import url from 'url';
import {
  getBestDiscounts,
  getNewest,
  getPhonesAmount,
  findPhone,
  getRecommended,
  getPhonesWithPagination,
} from '../services/phones';

export const getPhonesController = (req: Request, res: Response) => {
  // eslint-disable-next-line node/no-deprecated-api
  const { sortBy, itemsNum, page } = url.parse(req.url, true).query;

  res.send(getPhonesWithPagination(sortBy, itemsNum, page));
};

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

      const result = {
        phoneDetails: data,
        phone: JSON.stringify(findPhone(phoneId)),
      };

      res.send(JSON.stringify(result));
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
