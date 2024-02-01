import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class AppModulePipe<T> implements PipeTransform<T> {
  transform(value: T, metadata: ArgumentMetadata) {
    console.log('Pipe: Global Module Pipe Executing..., value:', value);
    return value;
  }
}
