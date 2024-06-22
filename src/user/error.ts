import { Result as BaseResult } from "@common/result";

export class UnexpectedError extends Error {
  cause: Error;

  constructor(cause: Error) {
    super("Unexpected Error");

    this.cause = cause;
  }
}

export class EmailAlreadyInUseError extends Error {
  email: string;

  constructor(email: string) {
    super(`Email Already in use. email: ${email}`);

    this.email = email;
  }
}

export type Error = UnexpectedError | EmailAlreadyInUseError;

export type Result<T> = BaseResult<T, Error>;
