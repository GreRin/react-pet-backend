import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "./config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
// import { ConnectionOptions } from 'typeorm';

export const config: PostgresConnectionOptions = {
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/migrations/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migrations",
  },
};

// module.exports = config;
