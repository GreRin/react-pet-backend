import { config } from '../config/ormconfig';

const mongoose = require('mongoose');

export const connectToMongoose = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (e) {
    /* eslint-disable no-console */
    console.log('Server Error', e.message);
    process.exit(1);
  }
};
