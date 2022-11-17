import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import {check, validationResult} from "express-validator";
import authService from "./login.service";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../../config/config";
import {setAccessToken} from "../../../helpers/redisStore";

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
        message: 'Incorrect registration data',
        status: StatusCodes.BAD_REQUEST
      }))
    }

    const { email, password } = req.body;
    const user: any = await authService.findByCredentials(
      email,
      password
    );
    if (!user) {
      return next(res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
        status: StatusCodes.NOT_FOUND
      }))
    }

    // create JWTs
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' },
      { algorithm: "RS256" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '1h' },
      { algorithm: "RS256" }
    );

    if (accessToken === "NOT_FOUND") {
      return next(res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
        status: StatusCodes.NOT_FOUND
      }))
    }

    if (accessToken === "FORBIDDEN") {
      createError(StatusCodes.FORBIDDEN, `Wrong password.`);
      return next(res.status(StatusCodes.FORBIDDEN).json({
        message: 'Wrong password.',
        status: StatusCodes.FORBIDDEN
      }))
    }
    // Set accessToken to database
    await setAccessToken(user.id, accessToken);
    await setAccessToken(`${user.id }refresh`, refreshToken);

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.cookie(`accessToken`, accessToken,{
      maxAge: 5 * 60 * 1000,
      secure: false,
      httpOnly: false,
      sameSite: 'lax'
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "User has authorization", accessToken, userId: user.id, status: StatusCodes.OK });
  } catch {
    return next(res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something goes wrong! Try again later.',
      status: StatusCodes.INTERNAL_SERVER_ERROR
    }))
  }
})
);
