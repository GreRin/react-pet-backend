import { getRepository } from 'typeorm';
import { Fund } from '../../entity/Fund';
import { IFundDto, Id } from '../../types/index';

const getAll = async (): Promise<Fund[]> => {
  const usersRepository = getRepository(Fund);
  return usersRepository.find({ where: {} });
};

const getById = async (id: Id): Promise<Partial<Fund> | undefined> => {
  const fundRepository = getRepository(Fund);
  const res = await fundRepository.findOne(id);
  return res;
};

const create = async (fund: IFundDto): Promise<Partial<Fund>> => {
  const fundRepository = getRepository(Fund);
  const newFund = fundRepository.create(fund);
  const savedFund = fundRepository.save(newFund);
  return savedFund;
};

const updateById = async (
  id: string,
  fund: IFundDto
): Promise<Fund | undefined> => {
  const fundRepository = getRepository(Fund);
  const res: Partial<Fund> | undefined = await getById(id);
  return res && fundRepository.save({ ...res, ...fund });
};

const deleteById = async (id: string): Promise<'DELETED' | 'NOT_FOUND'> => {
  const fundsRepository = getRepository(Fund);
  const delitionRes = await fundsRepository.delete(id);
  if (delitionRes.affected) return 'DELETED';
  return 'NOT_FOUND';
};

export default { getAll, create, getById, updateById, deleteById };
