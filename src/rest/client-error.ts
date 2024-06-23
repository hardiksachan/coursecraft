import {
  EmailAlreadyInUseError,
  InvalidEmailAndPasswordCombinationError,
  Error as UserError,
  UserNotFoundError,
} from "@user/error";
import { Response } from "express";
import { ZodError } from "zod";

export type ClientError = {
  httpStatus: number;
  tag: string;
  message: string;
  data?: any;
};

export const sendClientError = (res: Response, err: ClientError) => {
  res.status(err.httpStatus).send(err);
};

export const internalServerError = (message?: string) =>
  ({
    httpStatus: 500,
    tag: "InternalServerError",
    message: message || "An unexpected error occured",
  }) satisfies ClientError;

export const insufficientPermissions = () =>
  ({
    httpStatus: 401,
    tag: "InsufficientPermission",
    message: "you don't have permission to perform this action",
  }) satisfies ClientError;

export const unauthenticated = () =>
  ({
    httpStatus: 401,
    tag: "Unauthenticated",
    message: "please log in to continue",
  }) satisfies ClientError;

export const validationError = (err: ZodError) => {
  let message = "Encountered some validation errors.";

  if (err.issues && err.issues.length) {
    message = "Encountered the following validation errors: ";
    err.issues.forEach((issue) => {
      const { path, message: issueMessage } = issue;
      const fieldName = path.join(".");
      message += `'${fieldName}': ${issueMessage} `;
    });
  }

  return {
    httpStatus: 400,
    tag: "ValidationError",
    message,
    data: err.issues,
  } satisfies ClientError;
};

export const fromUserDomainError = (error: UserError) => {
  if (error instanceof EmailAlreadyInUseError) {
    return {
      httpStatus: 409,
      tag: "EmailAlreadyInUseError",
      message: "The email address is already in use",
    } satisfies ClientError;
  }

  if (error instanceof InvalidEmailAndPasswordCombinationError) {
    return {
      httpStatus: 400,
      tag: "InvalidEmailAndPasswordCombinationError",
      message: "The email and password combination is incorrect.",
    } satisfies ClientError;
  }

  if (error instanceof UserNotFoundError) {
    return {
      httpStatus: 400,
      tag: "UserNotFoundError",
      message: "This user does not exist.",
      data: {
        email: error.email,
      },
    } satisfies ClientError;
  }

  return internalServerError();
};
export const sendUserDomainError = (res: Response, error: UserError) =>
  sendClientError(res, fromUserDomainError(error));
