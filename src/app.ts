import express, { Request, Response, NextFunction } from 'express';
// import { router as fundsRouter } from './resources/users/user.router';
// import { router as  donationsRouter } from './resources/boards/boards.router';
import { logger } from './middlewares/index';
import "reflect-metadata";

const app = express();

const { requestLogger, errorLogger, unhandledRejectionLogger, unhandledExceptionLogger } = logger;

app.use(express.json());

app.use(requestLogger);

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// app.use('/funds', fundsRouter);
// app.use('/donations', donationsRouter);

app.use(errorLogger);

process.on('unhandledRejection', unhandledRejectionLogger);
process.on('uncaughtException', unhandledExceptionLogger);

export default app;
