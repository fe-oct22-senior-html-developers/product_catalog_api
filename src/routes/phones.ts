import express from 'express';
import {
  getDiscountController,
  getNewestController,
  getPhonesAmountController,
  getPhoneInfoController,
  getRecommendedController,
} from '../controllers/phones';

export const router = express.Router();

router.get('/new', getNewestController);
router.get('/discount', getDiscountController);
router.get('/amount', getPhonesAmountController);
router.get('/:phoneId', getPhoneInfoController);
router.get('/:phoneId/recommended', getRecommendedController);
