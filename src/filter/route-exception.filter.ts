import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionService } from 'src/service/exception.service';

@Injectable()
@Catch(HttpException)
export class RouteExceptionFilter implements ExceptionFilter {
  constructor(private exceptionService: ExceptionService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('ExceptionFilter: Route Exception Filter Executing...');
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)
      .json(this.exceptionService.catch(exception, request.url));
    response.status(status);
    console.log('\n\n\t\t\t\t----------- END OF REQUEST ------------\n\n');
  }
}
