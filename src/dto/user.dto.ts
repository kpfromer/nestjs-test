import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
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

  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiModelProperty()
  readonly lastName: string;
}
