import {ArgumentMetadata, BadRequestException, Pipe, PipeTransform} from '@nestjs/common';

@Pipe()
export class IsNotArrayPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    const { metatype } = metadata;

    if (!metatype) {
      throw new BadRequestException('No property');
    }

    if (value instanceof Array) {
      throw new BadRequestException(`Property is an array`);
    }

    return value;
  }
}