import fs from 'fs';
import path from 'path';

export const errorLoggingFile = path.resolve(__dirname, '../../logs/loggingError.txt');

export const unhandledRejectionLogger = (reason: Error, p: Promise<Error>): void => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
  fs.writeFileSync(errorLoggingFile,`unhandledRejection: ${reason} Unhandled Rejection at Promise ${JSON.stringify(p)}\n`);
  process.exit(1);
};
