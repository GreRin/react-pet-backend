import { getRepository } from "typeorm";
import { Donation } from "../../entity/Donation";
import { IDonationDto } from "../../types";

const getAll = async (): Promise<Donation[]> => {
  const usersRepository = await getRepository(Donation);
  return usersRepository.find({ where: {} });
};

const create = async (donation: IDonationDto): Promise<Partial<Donation>> => {
  const donationRepository = await getRepository(Donation);
  const newDonation = donationRepository.create(donation);
  const savedDonation = donationRepository.save(newDonation);
  return savedDonation;
};

export default { getAll, create };
