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

export interface IFund extends IEntity {
  name: string;
  totalFunds: number;
  createdAt?: Date;
  updatedAt: Date;
};

export type IFundDto = Omit<IFund, 'id'>;

export interface IDonation extends IEntity {
  toFund: string;
  amount: number;
  date: Date;
  fromOrganization: string;
};

export type IDonationDto = Omit<IDonation, 'id'>;
