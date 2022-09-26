import { getConnection, createConnection, Connection } from "typeorm";
import { configPostgresQL } from "../common/ormconfig";

export const connectToDB = async (): Promise<void> => {
  let connection: Connection | null = null;

  try {
    connection = getConnection();
  } catch (error) {
    console.log("Connection does not exist: ", error.message);
  }

  try {
    if (connection) {
      if (!connection.isConnected) await connection.connect();
    } else {
      connection = await createConnection(configPostgresQL);
    }
    await connection.runMigrations();
    console.log("DB PostresQL has been connected");
  } catch (error) {
    console.error(error);
  }
};
