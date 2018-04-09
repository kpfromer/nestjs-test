import {IsString, IsMongoId} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class Token {
  @IsMongoId()
  @ApiModelProperty()
  readonly id: string;
  @IsString()
  @ApiModelProperty()
  readonly username: string;
}