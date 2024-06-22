import { registerUserRequestSchema } from "@user/usecase/register";
import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { ZodError } from "zod";

export const main = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  app.get("/health", (_, res) => {
    res.status(400).send();
  });

  app.post("/api/auth/register", (req, res) => {
    const registerRequest = registerUserRequestSchema.parse(req.body);
    res.sendStatus(200);
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ZodError) {
      res
        .status(400)
        .send({
          tag: "ValidationError",
          message: "Failed to validate",
          fields: err.message,
        });
    } else {
      res.status(500).send({
        tag: "Unknown Error",
        message: "An internal error occurred, please try again.",
      });
    }
  });

  app.listen(3000);
};
