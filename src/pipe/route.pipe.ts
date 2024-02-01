import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class RoutePipe<T> implements PipeTransform<T> {
  transform(value: T, metadata: ArgumentMetadata) {
    console.log('Pipe: Route Pipe Executing..., value:', value);
    return value;
  }
}
