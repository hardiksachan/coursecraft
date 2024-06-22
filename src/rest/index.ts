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

export const main = () => {
  const userStore = new InMemoryUserStore();
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  app.get("/health", (_, res) => {
    res.status(400).send();
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

  app.use(errorMiddleware);

  app.listen(3000);
};
