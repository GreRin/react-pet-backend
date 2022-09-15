import express from "express";
import { routes } from "./resources/index";
import { logger } from "./middlewares/index";
import "reflect-metadata";
const cors = require("cors");

const app = express();

const { userRouter, fundsRouter, donationsRouter, loginRouter } = routes;

const {
  requestLogger,
  errorLogger,
  unhandledRejectionLogger,
  unhandledExceptionLogger,
  auth,
} = logger;

app.use(express.json());

app.use(requestLogger);

app.use(cors({ origin: "*" }));

app.use("/api/login", loginRouter);
app.use(auth);
app.use("/api/users", userRouter);
app.use("/api/funds", fundsRouter);
app.use("/api/donations", donationsRouter);

app.use(errorLogger);

process.on("unhandledRejection", unhandledRejectionLogger);
process.on("uncaughtException", unhandledExceptionLogger);

export default app;
