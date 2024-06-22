import { Result } from "@user/error";
import { Profile, Credential } from "@user/domain";

export interface UserStore {
  createUser(profile: Profile, credential: Credential): Promise<Result<void>>;
}
