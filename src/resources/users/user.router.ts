import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../entity/User';
import { IUser } from '../../types';
import usersService from './user.service';

export const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    try {
      const users: IUser[] = await usersService.getAll();
      res.json(users.map(User.toResponse));
    } catch (err) {
      console.error(err.message);
    }
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
      const user: Partial<IUser> | undefined = await usersService.getById(id);
      if (!user)
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found!' });
      res.status(StatusCodes.OK).json(User.toResponse(user));
    }
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const user: Partial<IUser> = await usersService.create(req.body);
    if (!user)
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not created!' });
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
      const user: Partial<IUser> = await usersService.updateById(id, req.body);
      if (!user)
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not update!' });
      res.status(StatusCodes.OK).json(User.toResponse(user));
    }
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
      await usersService.deleteById(id);
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: 'User successfully delete' });
    }
  })
);
