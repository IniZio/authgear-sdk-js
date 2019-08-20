import { JSONObject } from "./types";

/**
 * @public
 */
export type SkygearErrorName =
  | "NotAuthenticated"
  | "PermissionDenied"
  | "AccessKeyNotAccepted"
  | "AccessTokenNotAccepted"
  | "InvalidCredentials"
  | "BadRequest"
  | "InvalidArgument"
  | "Duplicated"
  | "ResourceNotFound"
  | "UndefinedOperation"
  | "PasswordPolicyViolated"
  | "UserDisabled"
  | "VerificationRequired"
  | "WebHookTimeOut"
  | "WebHookFailed"
  | "CurrentIdentityBeingDeleted";

/**
 * @public
 */
export class SkygearError extends Error {
  info?: JSONObject;

  constructor(message: string, name: string, info?: JSONObject) {
    super(message);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name
    this.name = name;
    this.info = info;
  }
}

/**
 * @public
 */
export function decodeError(err?: any): Error {
  // Construct SkygearError if it looks like one.
  if (
    err != null &&
    !(err instanceof Error) &&
    typeof err.name === "string" &&
    typeof err.message === "string"
  ) {
    return new SkygearError(err.message, err.name, err.info);
  }
  // If it is an Error, just return it.
  if (err instanceof Error) {
    return err;
  }
  // If it has message, construct an Error from the message.
  if (err != null && typeof err.message === "string") {
    return new Error(err.message);
  }
  // If it can be turned into string, use it as message.
  if (err != null && typeof err.toString === "function") {
    return new Error(err.toString());
  }
  // Otherwise cast it to string and use it as message.
  return new Error(String(err));
}
