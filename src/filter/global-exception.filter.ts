import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionService } from 'src/service/exception.service';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('ExceptionFilter: Global Exception Filter Executing...');
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    // response.status(status).json({
    //   statusCode: status,
    //   message,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    //   ps: 'timestamp & path properties added by global exception filter.',
    // });
    const errorResponse = exception.getResponse();

    const error = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      ps: 'timestamp & path properties added by global exception filter.',
    };

    if (typeof errorResponse === 'object')
      response.status(status).json({ ...errorResponse, ...error });
    else response.status(status).json(error);
    console.log('\n\n\t\t\t\t----------- END OF REQUEST ------------\n\n');
  }
}
