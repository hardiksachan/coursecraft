import { z } from "zod";

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

export interface TokenService {
  makeToken(payload: Payload): Token;
}
