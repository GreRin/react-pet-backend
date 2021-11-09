import {getRepository} from "typeorm";
import {Donation} from '../../entity/Donation';
import {IDonation, IDonationDto} from "../../types";

const getAll = async (): Promise<Donation[]> => {
  const usersRepository = getRepository(Donation);
  return usersRepository.find({where: {}});
};

// const getById = async (id: Id): Promise<Partial<Fund> | undefined> => {
//   const fundRepository = getRepository(Fund);
//   const res = await fundRepository.findOne(id);
//   return res;
// }

const create = async (donation: IDonationDto): Promise<Partial<Donation>> => {
  const donationRepository = getRepository(Donation);
  // @ts-ignore
  const newDonation = donationRepository.create(donation);
  const savedDonation = donationRepository.save(newDonation);
  return savedDonation;
};

// const updateById = async (id: string, fund: IFundDto): Promise<Fund | undefined> => {
//   const fundRepository = getRepository(Fund);
//   const res: Partial<Fund> | undefined = await getById(id);
//   return res && fundRepository.save({...res, ...fund});
// };
//
// const deleteById = async (id: string): Promise<'DELETED' | 'NOT_FOUND'> => {
//   const fundsRepository = getRepository(Fund);
//   const delitionRes = await fundsRepository.delete(id);
//   if (delitionRes.affected) return 'DELETED'
//   return 'NOT_FOUND'
// }

export default {getAll, create};
