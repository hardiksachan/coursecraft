import { EmailAlreadyInUseError, Result } from "@user/error";
import { Profile, Credential } from "@user/domain";
import { UserStore } from "@user/ports";
import { unit, Unit } from "@common/unit";
import { err, ok } from "@common/result";

type Row = Profile & Credential;

export class InMemoryUserStore implements UserStore {
  users: Row[] = [];

  async createUser(
    profile: Profile,
    credential: Credential,
  ): Promise<Result<Unit>> {
    if (this.users.find(({ email }) => email === profile.email)) {
      return err(new EmailAlreadyInUseError(profile.email));
    }

    this.users = [{ ...profile, ...credential }, ...this.users];

    return ok(unit());
  }
}
