import asyncHandler from "express-async-handler";
import {Request, Router} from "express";
import {StatusCodes} from "http-status-codes";
import {REFRESH_TOKEN_SECRET} from "../../config/config";

export const router = Router();

const jwt = require('jsonwebtoken');
const User = require("../../entity/User");

router.route("/").post(asyncHandler(async (req: Request, _res: any) => {
  try {
    const {cookies} = req;
    if (!cookies.jwt) {
      return _res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      return _res.sendStatus(403);
    }
    // evaluate jwt
    let accessToken;
    let userData;
    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      (err: Error, decoded: any) => {
        if (err) return _res.sendStatus(403);
        accessToken = jwt.sign(
          { userId: decoded.id, email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '10s' }
        );
        userData = { userId: decoded.id, email: decoded.email };
        return _res.json({ decoded, accessToken })
      }
    );
    return _res.json({ userData, accessToken })
  } catch (error) {
    return _res.status(StatusCodes.FORBIDDEN).json({
      message: error.message
    })
  }
}))
