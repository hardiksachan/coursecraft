import "express-async-errors";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { contextResolver, errorMiddleware } from "./middleware";
import { InMemoryUserStore } from "@user/adapters/user_store/in_memory";
import cookieParser from "cookie-parser";
import { config } from "@common/config";
import { JWT } from "@common/token";
import { authRouter } from "./routers";

export const main = () => {
  const userStore = new InMemoryUserStore();
  const jwtTokenService = new JWT();
  const app = express();

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  app.use(contextResolver(jwtTokenService));

  app.get("/health", (_, res) => {
    res.status(200).send();
  });

  app.use("/api/auth", authRouter(userStore, jwtTokenService));

  app.use(errorMiddleware);

  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};
