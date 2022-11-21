import asyncHandler from "express-async-handler";
import {NextFunction, Request, Response, Router} from "express";
import {StatusCodes} from "http-status-codes";
import {check, validationResult} from "express-validator";
import authService from "./login/login.service";
import usersService from "../user/user.service";
import {sentGmailEmail} from "../../mailer/sentMails";

const generator = require('generate-password');

export const router = Router();

router.route("/").post([
  check('email', 'Enter correct e-mail').isEmail(),
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

    const { email } = req.body;
    const user: any = await authService.findByEmail(email);
    if (!user) {
      return next(res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
        status: StatusCodes.NOT_FOUND
      }))
    }

    const updatedUser = user;
    const newPassword = generator.generate({
      length: 10,
      numbers: true
    });
    updatedUser.password = newPassword;
    const newData = await usersService.updateById(user.id, updatedUser);

    // Sent updated data to user
    // await sentEmail(newData, newPassword);
    await sentGmailEmail(newData, newPassword);

    return res
      .status(StatusCodes.OK)
      .json({ message: `Password was sent to ${ email}`, status: StatusCodes.OK });
  } catch {
    return next(res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something goes wrong! Try again later.',
      status: StatusCodes.INTERNAL_SERVER_ERROR
    }))
  }
})
);
