import { z } from "zod";
import { emailSchema, hashedPasswordSchema } from "./value_objects";

export const credentialSchema = z.object({
  email: emailSchema,
  hashedPassword: hashedPasswordSchema,
});

export type Credential = z.infer<typeof credentialSchema>;
