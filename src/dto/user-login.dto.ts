import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @ApiModelProperty()
  readonly username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @ApiModelProperty()
  readonly password: string;
}
