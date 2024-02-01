import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform<T> {
  constructor(private schema: ZodSchema) {}

  transform(value: T, metadata: ArgumentMetadata) {
    console.log(
      'Pipe: Parameter Pipe (ZodValidationPipe) Executing..., value:',
      value,
    );

    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException({ message: 'Validation Error', error });
    }
  }
}
