import {getRepository} from "typeorm";
import {User} from '../../entity/User';
import {IUser, IUserDto, Id} from '../../types/index';

const getAll = async (): Promise<User[]> => {
  const usersRepository = getRepository(User);
  return usersRepository.find({where: {}});
};

export const getByLogin = async (login: string): Promise<User | undefined> =>
  getRepository(User).findOne({ login });

const getById = async (id: Id): Promise<Partial<User> | undefined> => {
  const usersRepository = getRepository(User);
  const res = await usersRepository.findOne(id);
  return res;
}

const create = async (user: IUser): Promise<Partial<User>> => {
  const usersRepository = getRepository(User);
  const newUser = usersRepository.create(user);
  const savedUser = usersRepository.save(newUser);
  return savedUser;
};

const updateById = async (id: string, user: IUserDto): Promise<User | undefined> => {
  const usersRepository = getRepository(User);
  const res: Partial<User> | undefined = await getById(id);
  return res && usersRepository.save({...res, ...user});
};

const deleteById = async (id: string): Promise<'DELETED' | 'NOT_FOUND'> => {
  const usersRepository = getRepository(User);
  const delitionRes = await usersRepository.delete(id);
  if (delitionRes.affected) return 'DELETED'
  return 'NOT_FOUND'
}

export default { getAll, getByLogin, getById, create, updateById, deleteById };
