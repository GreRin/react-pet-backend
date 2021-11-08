import { ConnectionOptions } from 'typeorm';
import { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './config';

export const config: ConnectionOptions = {
   type: DB_TYPE,
   host: DB_HOST,
   port: Number(DB_PORT),
   username: DB_USER,
   password: DB_PASSWORD,
   database: DB_NAME,
   synchronize: true,
   entities: ["./src/entity/**/*.ts"],
   migrations: ["./src/migration/**/*.ts"],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
   }
};

export default config;
