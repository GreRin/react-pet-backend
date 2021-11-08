import { User } from '../../entity/User';
import { IUser } from '../../types/index';
import usersRepo from './user.memory.repository';

const getAll = (): Promise<User[]> => usersRepo.getAll();

export const getByLogin = async (login: string): Promise<Partial<User> | undefined> =>
  User.toResponse(await usersRepo.getByLogin(login));

const getById = async (id: string): Promise<Partial<User> | undefined> =>
  User.toResponse(await usersRepo.getById(id));

const create = async (body: IUser): Promise<User>  =>
  User.toResponse(await usersRepo.create(body)) as User;

const updateById = async (id: string, user: IUser): Promise<Partial<User>> =>
  User.toResponse(await usersRepo.updateById(id, user)) as User;

const deleteById = (id: string): Promise<'DELETED' | 'NOT_FOUND'> => usersRepo.deleteById(id);

export default { getAll, getById, create, updateById, deleteById};
