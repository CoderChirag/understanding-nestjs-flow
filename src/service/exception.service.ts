import { HttpException } from '@nestjs/common';

export class ExceptionService {
  catch(exception: HttpException, path: string) {
    console.log('ExceptionService: catch() Executing...');
    const status = exception.getStatus();
    const message = exception.message;
    const response = exception.getResponse();

    const error = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path,
      ps: 'timestamp & path properties added by route exception filter.',
    };

    if (typeof response === 'object') return { ...response, ...error };

    return error;
  }
}
