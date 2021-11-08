import { Request } from "express";

export interface IRequest extends Request {
  originalUrl: string
}

export interface ICustomError extends Error {
  status: number;
  message: string;
}
