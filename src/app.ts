import express from "express";
import bodyParser from "body-parser";
import { routes } from "./resources";
import { logger } from "./middlewares";
import "reflect-metadata";
import { schema } from "./graphQL/schemas";
import { root } from "./graphQL/resolver";
import { auth } from "./middlewares/auth";

const expressGraphql = require('express-graphql').graphqlHTTP;

const cookieParser = require('cookie-parser')

const cors = require("cors");
const helmet = require("helmet");
const corsOptions = require('./config/corsOptions');

const app = express();

// allow the app to use cookieparser
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(cookieParser());

const { userRouter,
  albumsRouter,
  photosRouter,
  donationsRouter,
  loginRouter,
  signupRouter,
  refreshTokenRouter,
  restorePassword,
  logoutRouter
} = routes;

const {
  requestLogger,
  errorLogger,
  unhandledRejectionLogger,
  unhandledExceptionLogger,
} = logger;

app.use(express.json());
app.use(bodyParser.json())

app.use(requestLogger);

app.use(cors(corsOptions));

// Other syntax
// app.options('*', cors()) .use(cors())

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter)
app.use("/api/refreshToken", refreshTokenRouter);
app.use("/api/restorePassword", restorePassword);
app.use(auth);
app.use('/api/graphql', expressGraphql({
  schema,
  rootValue: root,
  graphiql: true,
  context: (req: { auth: any; }, _res: any, _graphQLParams: any) => {
    console.log(req)
    return {auth: req.auth}
  }
}));
app.use("/api/users", userRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/photos", photosRouter);
app.use("/api/donations", donationsRouter);

app.use(errorLogger);

process.on("unhandledRejection", unhandledRejectionLogger);
process.on("uncaughtException", unhandledExceptionLogger);

export default app;
