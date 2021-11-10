import fs from 'fs';
import path from 'path';
import { finished } from 'stream';
import { NextFunction, Response } from 'express';
import { IRequest } from '../types';

export const requestLoggingFile = fs.createWriteStream(path.resolve(__dirname, '../../logs/loggingRequest.txt'));

export const requestLogger = (req: IRequest, res: Response, next: NextFunction): void => {
  const { method, url, query, body } = req;
  finished(res, ():void => {
    const { statusCode }  = res;
    const str = `${method} ${url} Query parameters: ${JSON.stringify(query)} Body: ${JSON.stringify(body)} ${statusCode}`;
    requestLoggingFile.write(`LOG: ${str} \n`);
  })
  next();
};
