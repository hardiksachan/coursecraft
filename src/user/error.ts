import { Result as BaseResult } from "@common/result";

export class UnexpectedError extends Error {
  cause: Error;

  constructor(cause: Error) {
    super("unexpected error");

    this.cause = cause;
  }
}

export class EmailAlreadyInUseError extends Error {
  email: string;

  constructor(email: string) {
    super(`email already in use. email: ${email}`);

    this.email = email;
  }
}

export class InvalidEmailAndPasswordCombinationError extends Error {
  constructor() {
    super("invalid email and password combination.");
  }
}

export type Error =
  | UnexpectedError
  | EmailAlreadyInUseError
  | InvalidEmailAndPasswordCombinationError;

export type Result<T> = BaseResult<T, Error>;
