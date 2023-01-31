import { Request } from 'express';

export interface IRequest extends Request {
  originalUrl: string;
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
  name?: string;
  email: string;
  password: string;
  albumsList: [];
}

export type IUserDto = Omit<IUser, 'id'>;

export interface IAlbum extends IEntity {
  userId: string;
  title: string;
  foto?: [];
  owner?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IAlbumDto = Omit<IAlbum, 'id'>;

export interface IDonation extends IEntity {
  toFund: string;
  amount: number;
  date: Date;
  fromOrganization: string;
}

export type IDonationDto = Omit<IDonation, 'id'>;

export interface TokenInterface {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}
