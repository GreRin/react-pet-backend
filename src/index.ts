import { PORT } from "./config/config";
import { connectToMongoose } from "./helpers/mongodb";

import app from "./app";

const connection = async () => {
  await connectToMongoose();
  app.listen(PORT, () =>
    /* eslint-disable no-console */
    console.log(`App is running on http://localhost:${PORT}`)
  );
};

connection();
