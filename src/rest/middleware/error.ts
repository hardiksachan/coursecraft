import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import {
  internalServerError,
  sendClientError,
  validationError,
} from "../client-error";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("An error occured");
  console.log(err);
  if (err instanceof ZodError) {
    sendClientError(res, validationError(err));
  } else {
    sendClientError(res, internalServerError());
  }
};
