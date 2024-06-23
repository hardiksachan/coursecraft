import { NextFunction, Request, Response } from "express";
import { noAuthError, sendClientError } from "../../rest/client-error";

export const requiresAuth =
  () => (req: Request, res: Response, next: NextFunction) => {
    if (req.ctx.user) {
      next();
    } else {
      sendClientError(res, noAuthError());
    }
  };
