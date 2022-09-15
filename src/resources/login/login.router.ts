import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import authService from "./login.service";
import { User } from "../../entity/User";
import { JWT_SECRET_KEY } from "../../common/config";
import { CustomError } from "../../middlewares/errorHandler";

const createError = require("http-errors");
const jwt = require("jsonwebtoken");
import { createClient } from "redis";

export const router = Router();

router.route("/").post(
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Connect to the Redis
    const client = createClient();
    client.on("error", err => console.log("Redis Client Error", err));
    await client.connect();

    const { email, password } = req.body;
    const user: Partial<User> | undefined = await authService.findByCredentials(
      email,
      password
    );
    if (!user) {
      return next(createError(StatusCodes.NOT_FOUND, `User not found`));
    }
    const token = jwt.sign(
      { userId: user.id, login: user.login },
      JWT_SECRET_KEY,
      { expiresIn: "1h" },
      { algorithm: "RS256" }
    );
    await client.set("key", token);
    const value = await client.get("key");
    console.log(value);
    if (token === "NOT_FOUND") {
      return next(new CustomError(StatusCodes.NOT_FOUND, `User not found`));
    }
    if (token === "FORBIDDEN") {
      return next(createError(StatusCodes.FORBIDDEN, `Wrong password.`));
    }
    res.setHeader("Authorization", token);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res
      .status(StatusCodes.OK)
      .json({ message: "User has authorization", token });
  })
);
