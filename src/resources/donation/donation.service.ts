import { Donation } from '../../entity/Donation';
import donationRepo from './donation.memory.repository';
import { IDonationDto } from '../../types';

const getAll = (): Promise<Donation[]> => donationRepo.getAll();

const create = async (body: IDonationDto): Promise<Donation> =>
  Donation.toResponse(await donationRepo.create(body)) as Donation;

export default { getAll, create };
