import { PORT } from "./common/config";
import { connectToMongoose } from "./helpers/mongodb";

import app from "./app";

const connection = async () => {
  await connectToMongoose();
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
};

connection();
