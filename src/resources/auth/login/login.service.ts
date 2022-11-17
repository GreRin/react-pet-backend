import { IUser } from "../../../types";

const bcrypt = require("bcrypt");
const User = require("../../../entity/User");

export const findByCredentials = async (
  email: string,
  password: string
): Promise<Partial<IUser> | undefined> => {
  const user = await User.findOne({email});
  if (!user) return undefined;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return undefined;
  return user;
};

export const findByEmail = async (
  email: string
): Promise<Partial<IUser> | undefined> => {
  const user = await User.findOne({email});
  if (!user) return undefined;
  return user;
};

export default { findByCredentials, findByEmail };
