// import { User } from "../../entity/User";
import { IUser } from "../../types";
import usersRepo from "./user.memory.repository";

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

// const getById = async (id: string): Promise<Partial<User> | undefined> =>
//   User.toResponse(await usersRepo.getById(id));
//
const create = async (body: IUser): Promise<IUser> => body;

// const updateById = async (id: string, user: IUser): Promise<Partial<User>> =>
//   User.toResponse(await usersRepo.updateById(id, user)) as User;
//
// const deleteById = (id: string): Promise<"DELETED" | "NOT_FOUND"> =>
//   usersRepo.deleteById(id);

export default { getAll, create };
