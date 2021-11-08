import { Request } from "express";

export interface IRequest extends Request {
  originalUrl: string
}

export interface ICustomError extends Error {
  status: number;
  message: string;
}

export type Id = string;

export interface IEntity {
  id: Id;
}

export interface IUser extends IEntity {
  name: string;
  login: string;
  password: string;
};

export type IUserDto = Omit<IUser, 'id'>;
