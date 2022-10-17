import { IUser } from "../../types";
import usersRepo from "./user.memory.repository";

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

const getById = (id: string): Promise<Partial<IUser> | undefined> => usersRepo.getById(id);

const create = (email: string, password: string): Promise<IUser> => usersRepo.create(email, password);

const updateById = async (id: string, user: IUser): Promise<IUser> =>
  await usersRepo.updateById(id, user) as IUser;

const deleteById = (id: string): Promise<"DELETED" | "NOT_FOUND"> => usersRepo.deleteById(id);

export default { getAll, create, getById, updateById, deleteById };
