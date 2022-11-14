import {IUser} from "../../../types";

const bcrypt = require("bcrypt");
const User = require('../../../entity/User');

const findByCredentials = async (
  login: string,
  password: string
): Promise<Partial<IUser> | undefined> => {
  const user = await User.findOne({ login });
  if (!user) return undefined;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return undefined;
  return user;
};

export default { findByCredentials };
