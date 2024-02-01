import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalMiddleware } from './middleware/global.middleware';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';
import { GlobalPipe } from './pipe/global.pipe';
import { GlobalGuard } from './guard/global.guard';
import { GlobalInterceptor } from './interceptor/global.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(globalMiddleware);
  app.useGlobalGuards(new GlobalGuard());
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalPipes(new GlobalPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}
bootstrap();
