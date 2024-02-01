import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, tap } from 'rxjs/operators';

export class ControllerInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    console.log(
      'Request Interceptor: Controller Request Interceptor Executing...',
    );
    return next.handle().pipe(
      tap((res: any) => {
        console.log(
          'Response Interceptor: Controller Response Interceptor Running..., res: ',
          res,
        );
      }),
      catchError((error) => {
        const { response, message, status, statusCode } = error;
        console.log(
          'Response Interceptor: Controller Response Interceptor Running..., error: ',
          { message: response || message, statusCode: status || statusCode },
        );
        throw error;
      }),
    );
  }
}
