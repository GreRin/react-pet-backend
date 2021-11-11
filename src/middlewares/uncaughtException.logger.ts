import fs from 'fs';
import path from 'path';

export const errorLoggingFile = path.resolve(
  __dirname,
  '../../logs/loggingError.txt'
);

export const unhandledExceptionLogger = (err: Error): void => {
  console.error(err, 'Uncaught Exception thrown');
  fs.writeFileSync(errorLoggingFile, `unhandledException: ${err}\n`);
  process.exit(1);
};
