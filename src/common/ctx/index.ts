import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const ctxSchema = z.object({
  requestId: z.string().default(uuidv4()),
  user: z
    .object({
      userId: z.string(),
      userEmail: z.string(),
    })
    .optional(),
});

export type Ctx = z.infer<typeof ctxSchema>;
