import {Request, Response, Router} from "express";
import asyncHandler from "express-async-handler";
import {StatusCodes} from "http-status-codes";
import {IPhoto} from "../../types";
import photoService from "./photo.service";
import albumsService from "../albums/albums.service";

export const router = Router();

router.route("/:albumId").get(
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const { albumId } = req.params;
      const photos: IPhoto[] = await photoService.getAll(albumId);
      return res.json(photos);
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: error.message
      })
    }
  })
);

router.route("/").post(
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const photo: Partial<IPhoto> | undefined = await photoService.create(req.body);
      return res.status(StatusCodes.CREATED).json({
        photo,
        message: 'Photo successfully created'
      })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something goes wrong! Try again later.',
        error
      })
    }
  })
);

router.route("/:id").delete(
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
