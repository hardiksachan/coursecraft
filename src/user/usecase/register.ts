import {
  credentialSchema,
  emailSchema,
  passwordSchema,
  profileSchema,
  usernameSchema,
} from "@user/domain";
import { UserStore } from "@user/ports";
import { z } from "zod";

export const registerUserRequestSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;

export const registerUserProvider =
  (store: UserStore) =>
  async ({ username, email, password }: RegisterUserRequest) => {
    const id = "abc";

    const profile = profileSchema.parse({
      id,
      username,
      email,
    });

    const credential = credentialSchema.parse({
      email,
      password,
    });

    return store.createUser(profile, credential);
  };
