import { NextFunction, Request, Response } from "express";

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json(`something broke$ ${err}`);
};
