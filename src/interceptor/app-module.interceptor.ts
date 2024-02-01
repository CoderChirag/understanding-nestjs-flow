import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, tap } from 'rxjs/operators';

export class AppModuleInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    console.log(
      'Request Interceptor: AppModule Request Interceptor Executing...',
    );
    return next.handle().pipe(
      tap((res: any) => {
        console.log(
          'Response Interceptor: AppModule Response Interceptor Running..., res: ',
          res,
        );
        console.log('\n\n\t\t\t\t----------- END OF REQUEST ------------\n\n');
      }),
      catchError((error) => {
        const { response, message, status, statusCode } = error;
        console.log(
          'Response Interceptor: AppModule Response Interceptor Running..., error: ',
          { message: response || message, statusCode: status || statusCode },
        );
        throw error;
      }),
    );
  }
}
