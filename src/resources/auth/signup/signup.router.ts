import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from "http-status-codes";
import { IUser } from "../../../types";
import {REFRESH_TOKEN_SECRET} from "../../../config/config";

const bcrypt = require('bcrypt');
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require('../../../entity/User');

export const router = Router();

router.route("/").post([
  check('email', 'Enter correct e-mail').isEmail(),
  check('password', 'Minimum e-mail length 6 symbols').isLength({ min: 6 })
],
/* eslint-disable  @typescript-eslint/no-explicit-any */
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
    const candidate: Partial<IUser> | undefined = await User.findOne({ email });
    if (candidate) {
      next(createError(StatusCodes.NOT_FOUND, `User already exist`));
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User already exist',
        status: StatusCodes.NOT_FOUND
      })
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const id = uuidv4();
    const user = new User({
      id,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" },
      { algorithm: "RS256" }
    );

    res.setHeader("Authorization", token);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User successfully created", token, userId: user.id, status: StatusCodes.OK });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something goes wrong! Try again later.',
      error
    })
  }
})
);
