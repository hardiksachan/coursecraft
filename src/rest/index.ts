import { registerUserRequestSchema } from "@user/usecase/register";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

export const main = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  app.get("/health", (_, res) => {
    res.status(400).send();
  });

  app.post("/api/auth/register", (req, res) => {
    console.log(req.body);
    const registerRequest = registerUserRequestSchema.parse(req.body);
    console.log(registerRequest);
    res.sendStatus(200);
  });

  app.listen(3000);
};
