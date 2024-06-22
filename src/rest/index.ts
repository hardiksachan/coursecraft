import "express-async-errors";
import {
  registerUserProvider,
  registerUserRequestSchema,
} from "@user/usecase/register";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares";
import { InMemoryUserStore } from "@user/adapters/user_store/in_memory";
import { sendUserDomainError } from "./client-error";
import { loginUserProvider, loginUserRequestSchema } from "@user/usecase/login";
import cookieParser from "cookie-parser";

export const main = () => {
  const userStore = new InMemoryUserStore();
  const app = express();

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  app.get("/health", (_, res) => {
    res.status(200).send();
  });

  app.post("/api/auth/register", async (req, res) => {
    const registrationRequest = registerUserRequestSchema.parse(req.body);
    const registerUser = registerUserProvider(userStore);
    const result = await registerUser(registrationRequest);
    if (result.ok) {
      res.status(200).send();
    } else {
      sendUserDomainError(res, result.error);
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const loginRequest = loginUserRequestSchema.parse(req.body);
    const loginUser = loginUserProvider(userStore);
    const result = await loginUser(loginRequest);
    if (result.ok) {
      res
        .cookie("access-token", result.data.accessToken, {
          expires: result.data.accessTokenExpirationDate,
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .send();
    } else {
      sendUserDomainError(res, result.error);
    }
  });

  app.use(errorMiddleware);

  app.listen(3000);
};
