import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { RouteBasedMiddleware } from './middleware/route-based.middleware';
import { MiddlewareSessionService } from './service/middleware-session.service';
import { ControllerBasedMiddleware } from './middleware/controller-based.middleware';
import { ExceptionService } from './service/exception.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppModuleExceptionFilter } from './filter/app-module-exception.filter';
import { AppModulePipe } from './pipe/app-module.pipe';
import { AppModuleGuard } from './guard/app-module.guard';
import { AppModuleInterceptor } from './interceptor/app-module.interceptor';

// Module Guards, RequestInterceptors & Pipes runs before the Global Guards & Pipes.
// Global Filters & ResponseInterceptors take precedence over Module Filters & ResponseInterceptors
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppModuleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppModuleInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: AppModulePipe,
    },
    {
      provide: APP_FILTER,
      useClass: AppModuleExceptionFilter,
    },
    MiddlewareSessionService,
    AppService,
    ExceptionService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ControllerBasedMiddleware).forRoutes(AppController);
    consumer
      .apply(RouteBasedMiddleware)
      .forRoutes(
        { path: '/', method: RequestMethod.GET },
        { path: '/standard-exception', method: RequestMethod.GET },
        { path: '/cat/:id', method: RequestMethod.POST },
      );
  }
}
