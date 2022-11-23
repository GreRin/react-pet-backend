import asyncHandler from "express-async-handler";
import {NextFunction, Request, Response, Router} from "express";
import { StatusCodes } from "http-status-codes";
import {deleteAccessToken, deleteRefreshToken} from "../../../helpers/redisStore";

export const router = Router();

router.route("/").post(/* eslint-disable  @typescript-eslint/no-explicit-any */
  asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { userId } = req.body;

      // Delete accessToken and refreshToken to Redis database
      await deleteRefreshToken(userId);
      await deleteAccessToken(userId);

      res.clearCookie(`accessToken`, {
        httpOnly: false,
      });

      return res
        .status(StatusCodes.OK)
        .json({ message: "User logged out"});
    } catch {
      return next(res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something goes wrong! Try again later.',
        status: StatusCodes.INTERNAL_SERVER_ERROR
      }))
    }
  })
);
