import { PORT } from "./common/config";
import { connectToDB } from "./helpers/db";

import app from "./app";

const connection = async () => {
  await connectToDB();
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
};

connection();
