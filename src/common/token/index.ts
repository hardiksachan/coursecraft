import { z } from "zod";
import ms from "ms";
import jwt from "jsonwebtoken";
import { config } from "@common/config";
import { addMilliseconds } from "date-fns";

export const payloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
});

export type Payload = z.infer<typeof payloadSchema>;

export const tokenSchema = z.object({
  token: z.string(),
  expirationDate: z.coerce.date(),
});

export type Token = z.infer<typeof tokenSchema>;

export const makeToken = (payload: Payload) => {
  const expirationDate = addMilliseconds(
    new Date(),
    ms(config.ACCESS_TOKEN_EXPIRATION_DURATION),
  );
  const token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRATION_DURATION,
  });

  return tokenSchema.parse({
    token,
    expirationDate,
  });
};
