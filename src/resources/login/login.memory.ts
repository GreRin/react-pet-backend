import { getRepository } from "typeorm";
import { User } from "../../entity/User";

const bcrypt = require("bcrypt");

const findByCredentials = async (
  login: string,
  password: string
): Promise<Partial<User> | undefined> => {
  const usersRepository = await getRepository(User);
  const user = await usersRepository.findOne({ login });
  if (!user) return undefined;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return undefined;
  return user;
};

export default { findByCredentials };
