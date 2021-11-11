import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

type iDbType =
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'cockroachdb'
  | 'sqlite'
  | 'mssql'
  | 'sap'
  | 'oracle'
  | 'cordova'
  | 'nativescript'
  | 'react-native'
  | 'sqljs'
  | 'mongodb'
  | 'aurora-data-api'
  | 'aurora-data-api-pg'
  | 'expo'
  | 'better-sqlite3'
  | 'capacitor';

export interface ProcessEnv {
  PORT: number;
  NODE_ENV: number;
  JWT_SECRET_KEY: string;
  AUTH_MODE: string;
  LOG_FOLDER: string;
  DB_TYPE: iDbType;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

declare const process: {
  env: ProcessEnv;
};

export const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  LOG_FOLDER,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

export const AUTH_MODE = process.env.AUTH_MODE === 'true';
