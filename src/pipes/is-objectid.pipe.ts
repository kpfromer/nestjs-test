import {
  ArgumentMetadata,
  BadRequestException,
  Pipe,
  PipeTransform
} from '@nestjs/common';

import { Validator } from 'class-validator';

@Pipe()
export class IsObjectIdPipe implements PipeTransform<any> {
  constructor(private readonly property: string = 'id') {}
  transform(value: any, metadata: ArgumentMetadata): any {
    const { metatype } = metadata;

    const validator = new Validator();

    if (!metatype) {
      throw new BadRequestException('No ObjectId');
    } else if (
      metatype !== String ||
      !validator.isMongoId(value[this.property])
    ) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value[this.property];
  }
}
