import express from "express";
import bodyParser from "body-parser";
import { routes } from "./resources";
import { logger } from "./middlewares";
import "reflect-metadata";

const cookieParser = require('cookie-parser')

const cors = require("cors");
const helmet = require("helmet");
const corsOptions = require('./config/corsOptions');

const app = express();

// allow the app to use cookieparser
app.use(helmet());
app.use(cookieParser());

const { userRouter, fundsRouter, donationsRouter, loginRouter, signupRouter, refreshTokenRouter } = routes;

const {
  requestLogger,
  errorLogger,
  unhandledRejectionLogger,
  unhandledExceptionLogger,
  auth
} = logger;

app.use(express.json());
app.use(bodyParser.json())

app.use(requestLogger);

app.use(cors(corsOptions));

// Other syntax
// app.options('*', cors()) .use(cors())

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/refreshToken", refreshTokenRouter);
app.use(auth);
app.use("/api/users", userRouter);
app.use("/api/funds", fundsRouter);
app.use("/api/donations", donationsRouter);

app.use(errorLogger);

process.on("unhandledRejection", unhandledRejectionLogger);
process.on("uncaughtException", unhandledExceptionLogger);

export default app;
