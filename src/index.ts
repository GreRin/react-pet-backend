import { PORT } from "./common/config";
// import { connectToDB } from "./helpers/db";
import { connectToMongoDB } from "./helpers/mongodb";

import app from "./app";

const connection = async () => {
  // await connectToDB();
  await connectToMongoDB();
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
};

connection();
