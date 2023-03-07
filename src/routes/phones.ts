import express from 'express';
import {
  getDiscountController,
  getNewestController,
} from '../controllers/phones';

export const router = express.Router();

router.get('/new', getNewestController);
router.get('/discount', getDiscountController);
