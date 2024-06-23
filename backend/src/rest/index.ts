import "express-async-errors";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { contextResolver, errorMiddleware, requiresAuth } from "./middleware";
import cookieParser from "cookie-parser";
import { config } from "@common/config";
import { JWT } from "@common/token";
import { authRouter, coursesRouter } from "./routers";
import { PostgresUserStore } from "@user/adapters/user_store/postgres";
import { PostgresCourseStore } from "@course/adapters/course_store/postgres";

export const main = () => {
  const userStore = new PostgresUserStore();
  const jwtTokenService = new JWT();

  const coursesStore = new PostgresCourseStore();

  const app = express();

  app.use(cors());

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  app.use(contextResolver(jwtTokenService));

  app.get("/health", (_, res) => {
    res.status(200).send();
  });

  app.use("/api/auth", authRouter(userStore, jwtTokenService));

  app.use(requiresAuth());

  app.use("/api/courses", coursesRouter(coursesStore));

  app.use(errorMiddleware);

  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};
