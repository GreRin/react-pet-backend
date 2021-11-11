import fs from 'fs';
import path from 'path';
import { NextFunction, Response } from 'express';
import { ICustomError, IRequest } from '../types';

export const errorLoggingFile = fs.createWriteStream(
  path.resolve(__dirname, '../../logs/loggingError.txt')
);

export const errorLogger = (
  err: ICustomError,
  _req: IRequest,
  res: Response,
  next: NextFunction
): void => {
  const { status = 500, message = 'InternalServerError' } = err;
  errorLoggingFile.write(`ERROR: ${status} ${message}\n`);
  res.status(status).json(message);
  next();
};
