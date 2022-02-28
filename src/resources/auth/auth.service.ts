import { User } from "../../entity/User";
import authRepo from "./auth.memory";

export const findByCredentials = async (
  login: string,
  password: string
): Promise<Partial<User> | undefined> =>
  User.toResponse(await authRepo.findByCredentials(login, password));

export default { findByCredentials };
