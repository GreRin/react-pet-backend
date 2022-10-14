import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  MONGO_URI,
  DB_TYPE,
} from "./config";

export const config = {
  mongoURI: MONGO_URI,
  type: DB_TYPE,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};

export default config;
