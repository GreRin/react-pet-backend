import {Request, Response, Router} from "express";
import asyncHandler from "express-async-handler"
import { StatusCodes } from "http-status-codes";

import {IAlbum, IAlbumDto} from "../../types";
import albumsService from "./albums.service";

export const router = Router();

router.route("/:userId").get(
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId } = req.params;
      const albums: IAlbum[] = await albumsService.getAll(userId);
      return res.json(albums);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: error.message
      })
    }
  })
);

router.route("/:userId/album/:id").get(
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const album: Partial<IAlbum> | undefined = await albumsService.getById(id);
      return res.status(StatusCodes.OK).json(album);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Album not found',
        error: error.message
      })
    }
  })
);

router.route("/").post(
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const album: Partial<IAlbumDto> = await albumsService.create(req.body);
      return res.status(StatusCodes.CREATED).json({
        album,
        message: 'Album successfully created'
      })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something goes wrong! Try again later.',
        error
      })
    }
  })
);

router.route("/:id").put(
  // asyncHandler(async (req: Request, _res: Response) => {
  //   const { id } = req.params;
  //   if (id) {
  // const fundData: IFundDto = {
  //   name: req.body.name,
  //   totalFunds: req.body.totalFunds,
  //   updatedAt: new Date(),
  // };
  // const fund: Partial<IFundDto> = await fundService.updateById(
  //   id,
  //   fundData
  // );
  // if (!fund)
  //   res
  //     .status(StatusCodes.NOT_FOUND)
  //     .json({ message: "Fund not updated!" });
  //   res.status(StatusCodes.OK).json(Fund.toResponse(fund));
  //   }
  // })
);

router.route("/:id").delete(
  // asyncHandler(async (req: Request, _res: Response) => {
  //   const { id } = req.params;
  //   if (id) {
  //   await fundService.deleteById(id);
  //   res
  //     .status(StatusCodes.NO_CONTENT)
  //     .json({ message: "User successfully delete" });
  //   }
  // })
);
