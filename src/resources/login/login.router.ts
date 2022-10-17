import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import {check, validationResult} from "express-validator";
import authService from "./login.service";
import { JWT_SECRET_KEY } from "../../common/config";
import { CustomError } from "../../middlewares/errorHandler";
import { IUser } from "../../types";

const createError = require("http-errors");
const jwt = require("jsonwebtoken");

export const router = Router();

router.route("/").post([
  check('email', 'Enter correct e-mail').normalizeEmail().isEmail(),
  check('password', 'Minimum e-mail length 6 symbols').isLength({ min: 6 })
], /* eslint-disable  @typescript-eslint/no-explicit-any */
asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(res.status(StatusCodes.BAD_REQUEST).json({
        errors: errors.array(),
        message: 'Incorrect registration data'
      }))
    }

    const { email, password } = req.body;
    const user: Partial<IUser> | undefined = await authService.findByCredentials(
      email,
      password
    );
    if (!user) {
      return next(createError(StatusCodes.NOT_FOUND, `User not found`));
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
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
    res.setHeader("Authorization", token);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: "User has authorization", token });
  } catch {
    return next(res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something goes wrong! Try again later.'
    }))
  }
})
);
