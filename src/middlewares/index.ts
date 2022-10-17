import { requestLogger } from './request.logger';
import { errorLogger } from './error.logger';
import { unhandledRejectionLogger } from './unhandledRejection.logger';
import { unhandledExceptionLogger } from './uncaughtException.logger';
import { auth } from './auth';

export const logger = {
  requestLogger,
  errorLogger,
  unhandledRejectionLogger,
  unhandledExceptionLogger,
  auth,
};
