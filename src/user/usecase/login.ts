import { emailSchema, passwordSchema } from "@user/domain";
import { UserStore } from "@user/ports";
import { z } from "zod";
import { InvalidEmailAndPasswordCombinationError, Result } from "@user/error";
import { err } from "@common/result";
import { addDays } from "date-fns";
import { ok } from "@common/result";

export const loginUserRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;

const loginUserResponseSchema = z.object({
  accessToken: z.string(),
  accessTokenExpirationDate: z.coerce.date(),
});

export type LoginUserResponse = z.infer<typeof loginUserResponseSchema>;

export const loginUserProvider =
  (store: UserStore) =>
  async ({ email, password }: LoginUserRequest) => {
    const savedCredentialsResult = await store.getSavedCredentials(email);
    if (!savedCredentialsResult.ok) return err(savedCredentialsResult.error);

    if (password !== savedCredentialsResult.data.password)
      return err(new InvalidEmailAndPasswordCombinationError());

    const profileResult = await store.getProfileByEmail(email);
    if (!profileResult.ok) return err(profileResult.error);
    const profile = profileResult.data;

    const expirationDate = addDays(new Date(), 1); // TODO: set from config
    const token = `user-${profile.userId}.${expirationDate.getTime()}`;

    return ok(
      loginUserResponseSchema.parse({
        accessToken: token,
        accessTokenExpirationDate: expirationDate,
      }),
    );
  };
