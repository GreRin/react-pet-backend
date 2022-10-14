const mongoose = require("mongoose");
import { config } from "../common/ormconfig";

export const connectToMongoose = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};
