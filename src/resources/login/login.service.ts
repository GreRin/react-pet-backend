import { User } from "../../entity/User";
import authRepo from "./login.memory";
const bcrypt = require("bcrypt");

export const findByCredentials = async (
  login: string,
  password: string
): Promise<Partial<User> | undefined> => {
  const user = await authRepo.findByCredentials(login, password);
  if (!user) return undefined;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return undefined;
  return user;
};

export default { findByCredentials };
