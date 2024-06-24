import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import {
  internalServerError,
  sendClientError,
  validationError,
} from "../client-error";
import * as Sentry from "@sentry/node";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    sendClientError(res, validationError(err));
  } else {
    Sentry.captureException(err);
    sendClientError(res, internalServerError());
  }
};
