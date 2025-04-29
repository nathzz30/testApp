import { Request, Response, NextFunction } from 'express';
import { ApiError } from './apiError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}
