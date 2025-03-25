export enum AuthErrors {
  UserNotFound = 'user_not_found',
  UserRoleNotFound = 'user_role_not_found',
  RoleNotFound = 'role_not_found',
  TokenNotFound = 'token_not_found',
  WrongCredentials = 'wrong_user_credentials',
  NoTokenProvided = 'no_token_provided',
  ExpiredToken = 'expired_token',
  InvalidToken = 'invalid_token',
  AccessDenied = 'access_denied',
}
