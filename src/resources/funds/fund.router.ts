import { Router } from "express";
// import asyncHandler from "express-async-handler"
// import { StatusCodes } from "http-status-codes";
// import { Fund } from "../../entity/Fund";
// import { IFund, IFundDto } from "../../types";
// import fundService from "./fund.service";

export const router = Router();

router.route("/").get(
  // asyncHandler(async (_req: Request, _res: Response) => {
  //   try {
  // const fund: IFund[] = await fundService.getAll();
  //     // res.json(fund.map(Fund.toResponse));
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // })
);

router.route("/:id").get(
  // asyncHandler(async (req: Request, _res: Response) => {
  //   const { id } = req.params;
  //   if (id) {
  // const user: Partial<IFund> | undefined = await fundService.getById(id);
  // if (!user)
  //   res.status(StatusCodes.NOT_FOUND).json({ message: "User not found!" });
  // res.status(StatusCodes.OK).json(Fund.toResponse(user));
  //   }
  // })
);

router.route("/").post(
  // asyncHandler(async (_req: Request, _res: Response) => {
  // const fundData: IFundDto = {
  //   name: req.body.name,
  //   totalFunds: req.body.totalFunds,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // };
  // const fund: Partial<IFundDto> = await fundService.create(fundData);
  // if (!fund)
  //   res.status(StatusCodes.NOT_FOUND).json({ message: "Fund not created!" });
  // res.status(StatusCodes.CREATED).json(Fund.toResponse(fund));
  // })
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
