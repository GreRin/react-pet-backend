import express from "express";
import bodyParser from "body-parser";
import { routes } from "./resources";
import { logger } from "./middlewares";
import "reflect-metadata";

const cors = require("cors");

const app = express();

const { userRouter, fundsRouter, donationsRouter, loginRouter, signupRouter } = routes;

const {
  requestLogger,
  errorLogger,
  unhandledRejectionLogger,
  unhandledExceptionLogger
} = logger;

app.use(express.json());
app.use(bodyParser.json())

app.use(requestLogger);

app.use(cors({ origin: "*" }));

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
// app.use(auth);
app.use("/api/users", userRouter);
app.use("/api/funds", fundsRouter);
app.use("/api/donations", donationsRouter);

app.use(errorLogger);

process.on("unhandledRejection", unhandledRejectionLogger);
process.on("uncaughtException", unhandledExceptionLogger);

export default app;
