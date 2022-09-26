const { MongoClient } = require("mongodb");

export const connectToMongoDB = async (): Promise<void> => {
  // Connection URL
  const url = "mongodb://127.0.0.1:27017";
  const dbName = "task-manager";

  // Create a new MongoClient
  let client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  // Database Name

  try {
    // Connect the client to the server (optional starting in v4.7)
    client = await client.connect();
    // Establish and verify connection
    await client.db(dbName);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
