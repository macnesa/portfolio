export const ErrorByName: Record<string, number> = {
  SequelizeValidationError: 400,
  SequelizeUniqueConstraintError: 400,
  SequelizeForeignKeyConstraintError: 400,
  InvalidCredentials: 400,
  NotFound: 404,
  Unauthenticated: 401,
  JsonWebTokenError: 401,
  Forbidden: 403,
  TokenExpiredError: 403,
  FailedUpdate: 500,
  Error: 400, // generic error fallback
};
