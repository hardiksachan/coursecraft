import { z } from "zod";
import { emailSchema, userIdSchema, usernameSchema } from "./value_objects";

export const profileSchema = z.object({
  userId: userIdSchema,
  username: usernameSchema,
  email: emailSchema,
});

export type Profile = z.infer<typeof profileSchema>;
