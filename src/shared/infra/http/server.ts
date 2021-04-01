import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors, isCelebrateError } from 'celebrate';
import uploadConfig from '@config/upload';

import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(
  cors({
    origin: process.env.APP_CORS_IPS?.split(';'),
    allowedHeaders: 'X-Requested-With, Accept, Content-Type',
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
);
if (process.env.NODE_ENV === 'development')
  app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log('joi', err);
  if (isCelebrateError(err)) {
    return response.status(400).json({
      err: err.message,
    });
  }
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3335, () => {
  console.log('🛰️  R4 server is running on port 3335!');
});
