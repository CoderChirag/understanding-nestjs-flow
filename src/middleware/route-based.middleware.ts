import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MiddlewareSessionService } from 'src/service/middleware-session.service';

@Injectable()
export class RouteBasedMiddleware implements NestMiddleware {
  constructor(private sessionService: MiddlewareSessionService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware: RouteBased Middleware Executing...');
    this.sessionService.getSession();
    next();
  }
}
