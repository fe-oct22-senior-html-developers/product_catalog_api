import express from 'express';
import cors from 'cors';
import { router as phonesRouter } from './routes/phones.js';

export const createServer = () => {
  const app = express();

  app.use(cors());

  app.use('/phones', express.json(), phonesRouter);

  return app;
};
