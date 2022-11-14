import 'dotenv/config';

export interface ProcessEnv {
  PORT: number;
  NODE_ENV: number;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  AUTH_MODE: string;
  LOG_FOLDER: string;
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  MONGO_URI: string;
}

declare const process: {
  env: ProcessEnv;
};

export const {
  PORT,
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  LOG_FOLDER,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  MONGO_URI,
} = process.env;

export const AUTH_MODE = process.env.AUTH_MODE === 'true';
