import {v4 as uuidv4} from "uuid";
import {Id, IUser} from "../../types";

const bcrypt = require('bcrypt');
const User = require("../../entity/User");

const getAll = (): Promise<IUser[]> => User.find();

// const getByLogin = (email: string): Promise<User | undefined> =>
//   getRepository(User).findOne({ email });
//
const getById = async (id: Id): Promise<Partial<IUser> | undefined> => {
  const res = await User.findOne({id});
  return res;
};

const create = async (email: string, password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const id = uuidv4();
  const newUser = new User({
    id,
    email,
    password: hashedPassword
  });

  const savedUser = await newUser.save();
  return savedUser;
};

const updateById = async (
  id: string,
  user: IUser
): Promise<IUser | undefined> => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  await User.updateOne({id}, {email: user.email, password: hashedPassword});
  const res = await User.findOne({id});
  return res;
};

const deleteById = async (id: string): Promise<"DELETED" | "NOT_FOUND"> => {
  const delitionRes = await User.deleteOne({id});
  if (delitionRes.affected) return "DELETED";
  return "NOT_FOUND";
};

export default { getAll, create, getById, updateById, deleteById };
