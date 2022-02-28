import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import authService from "./auth.service";
import { User } from "../../entity/User";
import { JWT_SECRET_KEY } from "../../common/config";
import { CustomError } from "../../middlewares/errorHandler";

const createError = require("http-errors");
const jwt = require("jsonwebtoken");

export const router = Router();

router.route("/").get(
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;
    const user: Partial<User> | undefined = await authService.findByCredentials(
      login,
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
    if (token === "NOT_FOUND") {
      return next(new CustomError(StatusCodes.NOT_FOUND, `User not found`));
    }
    if (token === "FORBIDDEN") {
      return next(createError(StatusCodes.FORBIDDEN, `Wrong password.`));
    }
    res.status(StatusCodes.OK).json({ token, user: User.toResponse(user) });
    return token;
  })
);
