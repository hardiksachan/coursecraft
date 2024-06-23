import { z } from "zod";

export const ctxSchema = z.object({
  requestId: z.string(),
  user: z
    .object({
      userId: z.string(),
      email: z.string(),
    })
    .optional(),
});

export type Ctx = z.infer<typeof ctxSchema>;
