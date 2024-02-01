import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class GlobalPipe<T> implements PipeTransform<T> {
  transform(value: T, metadata: ArgumentMetadata) {
    console.log('Pipe: Global Pipe Executing..., value:', value);
    return value;
  }
}
