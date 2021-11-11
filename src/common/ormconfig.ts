import { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './config';

export const config: { cli: { subscribersDir: string; entitiesDir: string; migrationsDir: string }; secretArn: string; type: string; password: string; database: string; driver: undefined; port: number; entities: string[]; migrations: string[]; host: string; location: string; resourceArn: string; region: string; username: string; synchronize: boolean } = {
  driver: undefined, location: "", region: "", resourceArn: "", secretArn: "",
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
