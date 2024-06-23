import { ctxSchema } from "@common/ctx";
import { TokenService } from "@common/token";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const contextResolver =
  (tokenService: TokenService) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const accessToken = req.cookies["access-token"] || "";
    const authClaims = tokenService.verifyToken(accessToken);

    if (authClaims.ok) {
      const { userId, email } = authClaims.data;

      req.ctx = ctxSchema.parse({
        requestId: uuidv4(),
        user: {
          userId,
          email,
        },
      });
    } else {
      req.ctx = ctxSchema.parse({
        requestId: uuidv4(),
      });
    }

    next();
  };