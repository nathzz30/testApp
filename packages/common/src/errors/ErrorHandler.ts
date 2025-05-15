import { Request, Response, NextFunction } from 'express';
import { CustomError } from './CustomError';

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  console.error(err); // log unhandled errors
  res.status(500).json({
    errors: [{ message: 'Internal Server Error' }],
  });
};
