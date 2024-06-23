import "express-async-errors";
import {
  registerUserProvider,
  registerUserRequestSchema,
} from "@user/usecase/register";
import express from "express";
import { loginUserProvider, loginUserRequestSchema } from "@user/usecase/login";
import { UserStore } from "@user/ports";
import { TokenService } from "@common/token";
import { sendUserDomainError } from "../client-error";
import { ACCESS_TOKEN_COOKIE_KEY } from "@common/constants";

export const authRouter = (
  userStore: UserStore,
  tokenService: TokenService
) => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const registrationRequest = registerUserRequestSchema.parse(req.body);
    const registerUser = registerUserProvider(userStore);
    const result = await registerUser(registrationRequest);
    if (result.ok) {
      res.status(201).send();
    } else {
      sendUserDomainError(res, result.error);
    }
  });

  router.post("/login", async (req, res) => {
    const loginRequest = loginUserRequestSchema.parse(req.body);
    const loginUser = loginUserProvider(userStore, tokenService);
    const result = await loginUser(loginRequest);
    if (result.ok) {
      res
        .cookie(ACCESS_TOKEN_COOKIE_KEY, result.data.accessToken.token, {
          expires: result.data.accessToken.expirationDate,
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .send();
    } else {
      res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
      sendUserDomainError(res, result.error);
    }
  });

  router.post("/logout", async (req, res) => {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    res.status(200).send();
  });

  return router;
};
