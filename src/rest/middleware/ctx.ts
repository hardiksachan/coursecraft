import { NextFunction, Request, Response } from "express";

export const resolveContext = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next();
};
