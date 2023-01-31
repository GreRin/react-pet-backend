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

router.route("/:userId/album/:id").put(
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      if (!id) return res.status(StatusCodes.BAD_REQUEST);
      const album: Partial<IAlbum> = await albumsService.updateById(id, req.body);
      return res.status(StatusCodes.OK).json(album);
    } catch (error) {
      return res.status(StatusCodes.NOT_MODIFIED).json({
        message: 'User NOT updated',
        error: error.message
      })
    }
  })
);

router.route("/:userId/album/:id").delete(
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      if (!id) return res.status(StatusCodes.BAD_REQUEST);
      await albumsService.deleteById(id);
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "Album successfully delete" });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Album NOT deleted',
        error
      })
    }
  })
);
