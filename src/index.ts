import { PORT } from './common/config';
import { connectToDB } from './helpers/db';

import app from './app';

connectToDB()
  .then(() => {
      app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
  })
  .catch((err: Error) => {
      console.log(`Fail connect to DB: `, err.message);
  });
