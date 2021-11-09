import {Router, Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {Donation} from '../../entity/Donation';
import {IDonation, IDonationDto} from '../../types';
import donationService from './donation.service';

export const router = Router();

router.route('/').get(asyncHandler(async (_req: Request, res: Response) => {
  try {
    const donation: Donation[] = await donationService.getAll();
    res.json(donation.map(Donation.toResponse));
  } catch (err) {
    console.error(err.message);
  }
}));

// router.route('/:id').get(asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   if(id) {
//     const user: Partial<IFund> | undefined = await fundService.getById(id);
//     if(!user) res.status(StatusCodes.NOT_FOUND).json({message: 'User not found!'});
//     res.status(StatusCodes.OK).json(Fund.toResponse(user));
//   }
// }));

router.route('/').post(asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  const donationData: IDonationDto = {
    toFund: req.body.toFund,
    amount: req.body.amount,
    date: new Date,
    fromOrganization: req.body.fromOrganization
  }
  const donation: Donation = await donationService.create(donationData);
  if(!donation) res.status(StatusCodes.NOT_FOUND).json({message: 'Fund not created!'});
  res.status(StatusCodes.CREATED).json(Donation.toResponse(donation))
}));

// router.route('/:id').put(asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   if(id) {
//     const fundData: IFundDto = {
//       name: req.body.name,
//       totalFunds: req.body.totalFunds,
//       updatedAt: new Date
//     }
//     const fund: Partial<IFundDto> = await fundService.updateById(id, fundData);
//     if(!fund) res.status(StatusCodes.NOT_FOUND).json({message: 'Fund not updated!'})
//     res.status(StatusCodes.OK).json(Fund.toResponse(fund));
//   }
// }));
//
// router.route('/:id').delete(asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   if(id) {
//     await fundService.deleteById(id);
//     res.status(StatusCodes.NO_CONTENT).json({message: 'User successfully delete'})
//   }
// }));
