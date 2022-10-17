import { IUser } from "../../types";

const User = require('../../entity/User');

const getAll = (): Promise<IUser[]> => User.find();

// const getByLogin = (login: string): Promise<User | undefined> =>
//   getRepository(User).findOne({ login });
//
// const getById = async (id: Id): Promise<Partial<User> | undefined> => {
//   const usersRepository = await getRepository(User);
//   const res = await usersRepository.findOne(id);
//   return res;
// };
//
const create = async (user: IUser): Promise<Partial<IUser>> => {
  const newUser = User(user);
  const savedUser = await User.save(newUser);
  return savedUser;
};
//
// const updateById = async (
//   id: string,
//   user: IUserDto
// ): Promise<User | undefined> => {
//   const usersRepository = await getRepository(User);
//   const res: Partial<User> | undefined = await getById(id);
//   return res && usersRepository.save({ ...res, ...user });
// };
//
// const deleteById = async (id: string): Promise<"DELETED" | "NOT_FOUND"> => {
//   const usersRepository = await getRepository(User);
//   const delitionRes = await usersRepository.delete(id);
//   if (delitionRes.affected) return "DELETED";
//   return "NOT_FOUND";
// };

export default { getAll, create };
