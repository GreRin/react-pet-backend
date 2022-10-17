import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
  public statusCode: number;

  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode || INTERNAL_SERVER_ERROR;
    this.message = message || 'Server Error!';
  }
}

export const errorHandler = (err: CustomError, _req: Request, res: Response, next: NextFunction): void => {
  const { statusCode, message } = err;
  res.status(statusCode).send({
    status: 'error',
    statusCode,
    message,
  });

  next();
};
