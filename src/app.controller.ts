import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './service/app.service';
import { ControllerExceptionFilter } from './filter/controller-exception.filter';
import { RouteExceptionFilter } from './filter/route-exception.filter';
import { ZodValidationPipe } from './pipe/zod-validation.pipe';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { ClassValidatorPipe } from './pipe/class-validator.pipe';
import { CreateDogDto } from './dto/create-dog.dto';
import { ControllerPipe } from './pipe/controller.pipe';
import { RoutePipe } from './pipe/route.pipe';
import { ControllerGuard } from './guard/controller.guard';
import { RouteGuard } from './guard/route.guard';
import { ControllerInterceptor } from './interceptor/controller.interceptor';
import { RouteInterceptor } from './interceptor/route.interceptor';

@Controller()
@UseGuards(ControllerGuard)
@UseInterceptors(ControllerInterceptor)
@UsePipes(ControllerPipe)
@UseFilters(ControllerExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Controller: getHello() Executing...');
    return this.appService.getHello();
  }

  @Get('ping')
  getPing(): string {
    console.log('Controller: getPing() Executing...');
    return this.appService.getPing();
  }

  @Get('unhandled')
  getUnhandled() {
    console.log('Controller: getUnhandled() Executing...');
    throw new Error('Unhandled Error in the Code.');
  }

  @Get('unhandled-standard')
  getUnhandledStandard() {
    console.log('Controller: getUnhandledStandard() Executing...');
    throw {
      statusCode: 404,
      message: 'Unhandled error, but throwing standard error object',
    };
  }

  @Get('standard-exception')
  @UseFilters(RouteExceptionFilter)
  getStandardException() {
    console.log('Controller: getStandardException() Executing...');
    throw new HttpException(
      'Throwing a Standard Nest HttpException',
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('pipe/:id')
  getId(@Param('id', ParseIntPipe) id: number) {
    console.log('Pipe: Inbuilt ParseInt Parameter Pipe Executing...');
    console.log(
      'Controller: getId() with built in Parameter Pipe Executing...',
    );
    return id;
  }

  //Route depicting Complete Nestjs Flow
  // To get Exception Filter also, provide body different than schema, or id which is not numeric string.
  @Post('cat/:id')
  @UseGuards(RouteGuard)
  @UseInterceptors(RouteInterceptor)
  @UsePipes(RoutePipe)
  @UseFilters(RouteExceptionFilter) // Unlike middlewares or guards or pipes or interceptors, any one of the All Registered ExceptionFilters, is applied to a Request instead of all registered ExceptionFilters.
  createCat(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(createCatSchema), ClassValidatorPipe)
    body: CreateCatDto,
  ) {
    console.log('Controller: createCat() Controller Executing...');
    return this.appService.createCat(body);
  }

  @Post('dog')
  createDog(@Body(ClassValidatorPipe) body: CreateDogDto) {
    console.log(
      'Controller: createDog() with Custom Class-Validator Parameter Pipe Executing...',
    );
    return body;
  }
}
