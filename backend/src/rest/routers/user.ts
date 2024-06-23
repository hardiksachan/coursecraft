import "express-async-errors";
import express from "express";
import { UserStore } from "@user/ports";
import {
  getUserProfileProvider,
  userProfileRequestSchema,
} from "@user/usecase/profile";

export const userRouter = (userStore: UserStore) => {
  const router = express.Router();

  router.get("/me", async (req, res) => {
    const profileRequest = userProfileRequestSchema.parse({
      userId: req.ctx.user!.userId,
    });
    const getProfile = getUserProfileProvider(userStore);
    const result = await getProfile(profileRequest);
    if (result.ok) {
      res.status(200).send(result.data);
    } else {
      res.status(400).send(result.error);
    }
  });

  return router;
};
