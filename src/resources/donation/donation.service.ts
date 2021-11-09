import {Donation} from '../../entity/Donation';
import donationRepo from './donation.memory.repository';
import {IDonationDto} from "../../types";

const getAll = (): Promise<Donation[]> => donationRepo.getAll();

// const getById = async (id: string): Promise<Partial<Fund> | undefined> =>
//   Fund.toResponse(await fundRepo.getById(id));
//
const create = async (body: IDonationDto): Promise<Donation>  =>
  Donation.toResponse(await donationRepo.create(body)) as Donation;

// const updateById = async (id: string, fund: IFundDto): Promise<Partial<Fund>> =>
//   Fund.toResponse(await fundRepo.updateById(id, fund)) as Fund;
//
// const deleteById = (id: string): Promise<'DELETED' | 'NOT_FOUND'> => fundRepo.deleteById(id);

export default {getAll, create};
