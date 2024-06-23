import { z } from "zod";
import { PASSWORD_REGEX } from "../constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const registerUserRequestSchema = z.object({
  username: z.string().min(1).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(1, { message: "password must not be empty" })
    .max(20, { message: "password can not be more than 20 characters" })
    .regex(PASSWORD_REGEX, {
      message:
        "password must contain a lowercase letter, an uppercase letter and a special character",
    }),
});

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (request: RegisterUserRequest) =>
      axios.post("/api/auth/register", request),
  });
};
