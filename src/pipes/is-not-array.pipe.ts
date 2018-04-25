import {
  ArgumentMetadata,
  BadRequestException, Injectable,
  PipeTransform
} from '@nestjs/common';

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
