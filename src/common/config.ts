import { z } from "zod";

const configSchema = z.object({
  PORT: z
    .string()
    .refine(
      (port) => parseInt(port) > 0 && parseInt(port) < 65536,
      "Invalid port number",
    ),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXPIRATION_DURATION: z.string(),
});

type Config = z.infer<typeof configSchema>;

export const config: Config = configSchema.parse(process.env);
