import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatDto } from 'src/dto/create-cat.dto';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Service: getHello() Executing...');
    return 'Hello World!';
  }

  getPing(): string {
    console.log('Service: getPing() Executing...');
    return 'Pong';
  }

  createCat(body: CreateCatDto) {
    console.log('Service: createCat() Executing...');
    return body;
  }
}
