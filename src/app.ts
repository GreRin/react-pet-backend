import express, { Request, Response, NextFunction } from "express";
import { routes } from "./resources/index";
import { logger } from "./middlewares/index";
import "reflect-metadata";

const app = express();

const { userRouter, fundsRouter, donationsRouter } = routes;

const {
  requestLogger,
  errorLogger,
  unhandledRejectionLogger,
  unhandledExceptionLogger,
} = logger;

app.use(express.json());

app.use(requestLogger);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.originalUrl === "/") {
    res.send("Service is running!");
    return;
  }
  next();
});

app.use("api/users", userRouter);
app.use("api/funds", fundsRouter);
app.use("api/donations", donationsRouter);

app.use(errorLogger);

process.on("unhandledRejection", unhandledRejectionLogger);
process.on("uncaughtException", unhandledExceptionLogger);

export default app;
