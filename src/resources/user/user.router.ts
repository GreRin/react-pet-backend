import { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { check, validationResult } from "express-validator";
import { IUser } from "../../types";
import usersService from "./user.service";

const createError = require("http-errors");

export const router = Router();

router.route("/").get(
/* eslint-disable  @typescript-eslint/no-explicit-any */
  asyncHandler(async (_req: Request, res: Response): Promise<any> => {
    try {
      const users: IUser[] = await usersService.getAll();
      return res.json(users);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: error.message
      })
    }
  })
);

router.route("/:id").get(
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const user: Partial<IUser> | undefined = await usersService.getById(id);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
        error: error.message
      })
    }
  })
);

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
        message: 'Incorrect registration data'
      }))
    }

    const { email, password } = req.body;
    const candidate = await usersService.getById(email);
    if (candidate) {
      return next(createError(StatusCodes.NOT_FOUND, {code: StatusCodes.NOT_FOUND, message:`User already exist`}));
    }

    const user = await usersService.create(email, password);

    return res.status(StatusCodes.CREATED).json({
      user,
      message: 'User successfully created'
    })
  } catch (error) {
    return next(res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something goes wrong! Try again later.',
      error
    }))
  }
})
);

router.route("/:id").put(
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  asyncHandler(async (req: Request, res: Response):Promise<any> => {
    try {
      const { id } = req.params;
      if (!id) return res.status(StatusCodes.BAD_REQUEST);
      const user: Partial<IUser> = await usersService.updateById(id, req.body);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      return res.status(StatusCodes.NOT_MODIFIED).json({
        message: 'User NOT updated',
        error: error.message
      })
    }
  })
);

router.route("/:id").delete(
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      if (!id) return res.status(StatusCodes.BAD_REQUEST);
      await usersService.deleteById(id);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "User successfully delete" });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'User NOT deleted',
        error
      })
    }
  })
);
