import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ControllerPipe<T> implements PipeTransform<T> {
  transform(value: T, metadata: ArgumentMetadata) {
    console.log('Pipe: Controller Pipe Executing..., value:', value);
    return value;
  }
}
