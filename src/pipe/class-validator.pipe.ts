import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ClassValidatorPipe<T> implements PipeTransform<T> {
  private toValidate(metatype: Function) {
    const types: Function[] = [String, Number, Boolean, Array, Object];
    return !types.includes(metatype);
  }

  async transform(value: T, { metatype }: ArgumentMetadata) {
    console.log(
      'Pipe: Parameter Pipe (ClassValidatorPipe) Executing..., value:',
      value,
    );

    if (!metatype || !this.toValidate) return value;
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0)
      throw new BadRequestException({
        message: 'Validation Error',
        error: errors,
      });
    return value;
  }
}
