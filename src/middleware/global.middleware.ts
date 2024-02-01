import { NextFunction, Request, Response } from 'express';

export function globalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    'Middleware: Global Middleware Executing..., endpoint:',
    `"${req.url}"`,
  );
  next();
}
