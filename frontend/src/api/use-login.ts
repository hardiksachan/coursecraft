import { z } from "zod";
import { PASSWORD_REGEX } from "../constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const loginUserRequestSchema = z.object({
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

export type LoginUserRequest = z.infer<typeof loginUserRequestSchema>;

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (request: LoginUserRequest) =>
      axios.post("/api/auth/login", request),
  });
};
