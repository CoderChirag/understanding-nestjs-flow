import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AppModuleExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('ExceptionFilter: AppModuleExceptionFilter Executing...');
    super.catch(exception, host);
    console.log('\n\n\t\t\t\t----------- END OF REQUEST ------------\n\n');

    //custom error handling can also be done as below:

    // const { httpAdapter } = this.httpAdapterHost;
    // const ctx = host.switchToHttp();

    // const httpStatus =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : (exception as any).statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    // const httpMessage = (exception as any).message || 'Internal Server Error.';

    // const responseBody = {
    //   statusCode: httpStatus,
    //   message: httpMessage,
    //   timestamp: new Date().toISOString(),
    //   path: httpAdapter.getRequestUrl(ctx.getRequest()),
    //   ps: 'timestamp & path properties added by all exceptions filter.',
    // };

    // httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
