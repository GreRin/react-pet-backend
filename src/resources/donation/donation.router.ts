import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Donation } from '../../entity/Donation';
import { IDonationDto } from '../../types';
import donationService from './donation.service';

export const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    try {
      const donation: Donation[] = await donationService.getAll();
      res.json(donation.map(Donation.toResponse));
    } catch (err) {
      console.error(err.message);
    }
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const donationData: IDonationDto = {
      toFund: req.body.toFund,
      amount: req.body.amount,
      date: new Date(),
      fromOrganization: req.body.fromOrganization,
    };
    const donation: Donation = await donationService.create(donationData);
    if (!donation)
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Fund not created!' });
    res.status(StatusCodes.CREATED).json(Donation.toResponse(donation));
  })
);
