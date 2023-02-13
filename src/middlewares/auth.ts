import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ACCESS_TOKEN_SECRET } from '../config/config';
import { TokenInterface } from '../types';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const auth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next(); // allowing options as a method for request
  }

  try {
    let sessionToken = req.cookies.accessToken || req.headers.authorization;
    if (sessionToken && sessionToken.indexOf('Bearer ') === 0) {
      sessionToken = sessionToken.slice(7);
    }
    if (!sessionToken) {
      throw new Error('Not authorized to access this resource. Auth token is not supplied');
    }
    const decoded = jwt.verify(sessionToken, ACCESS_TOKEN_SECRET) as TokenInterface;
    if (!decoded || !decoded.userId) {
      throw new Error('Not authorized to access this resource. Token is not valid');
    }
  } catch (error) {
    return next(createError(StatusCodes.UNAUTHORIZED, `UNAUTHORIZED`));
  }
  console.log('Everithing OK');
  return next();
});

export { auth };
