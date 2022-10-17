import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Donation } from '../../entity/Donation';
import { IDonationDto } from '../../types';
import donationService from './donation.service';

export const router = Router();

router.route('/').get(
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  asyncHandler(async (_req: Request, res: Response): Promise<any> => {
    try {
      const donation: Donation[] = await donationService.getAll();
      return res.json(donation.map(Donation.toResponse));
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Funds not found.',
        error: error.message
      })
    }
  })
);

router.route('/').post(
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
      const donationData: IDonationDto = {
        toFund: req.body.toFund,
        amount: req.body.amount,
        date: new Date(),
        fromOrganization: req.body.fromOrganization,
      };
      const donation: Donation = await donationService.create(donationData);
      if (!donation) res.status(StatusCodes.NOT_FOUND).json({ message: 'Fund not created!' });
      return res.status(StatusCodes.CREATED).json(Donation.toResponse(donation));
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Funds not created.',
        error: error.message
      })
    }
  })
);
