import {Fund} from '../../entity/Fund';
import {IFund, IFundDto} from '../../types/index';
import fundRepo from './fund.memory.repository';

const getAll = (): Promise<Fund[]> => fundRepo.getAll();

const getById = async (id: string): Promise<Partial<Fund> | undefined> =>
  Fund.toResponse(await fundRepo.getById(id));

const create = async (body: IFundDto): Promise<Fund>  =>
  Fund.toResponse(await fundRepo.create(body)) as Fund;

const updateById = async (id: string, fund: IFundDto): Promise<Partial<Fund>> =>
  Fund.toResponse(await fundRepo.updateById(id, fund)) as Fund;

const deleteById = (id: string): Promise<'DELETED' | 'NOT_FOUND'> => fundRepo.deleteById(id);

export default {getAll, create, getById, updateById, deleteById};
