import express, { Request, Response, NextFunction } from "express";
import { routes } from "./resources/index";
import { logger } from "./middlewares/index";
import "reflect-metadata";

const app = express();

const { userRouter, fundsRouter, donationsRouter, authRouter } = routes;

const {
  requestLogger,
  errorLogger,
  unhandledRejectionLogger,
  unhandledExceptionLogger,
  auth,
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

app.use("/api/auth", authRouter);
app.use("/api/users", auth, userRouter);
app.use("/api/funds", auth, fundsRouter);
app.use("/api/donations", auth, donationsRouter);

app.use(errorLogger);

process.on("unhandledRejection", unhandledRejectionLogger);
process.on("uncaughtException", unhandledExceptionLogger);

export default app;
