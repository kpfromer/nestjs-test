import {
  IsString,
  MinLength,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsDateString,
  IsInt
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TaskDto {
  @IsString()
  @MinLength(1)
  @ApiModelProperty()
  readonly description: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly complete: boolean;

  @IsOptional()
  @IsMongoId()
  @ApiModelProperty()
  readonly project: string;

  @IsOptional()
  @IsInt()
  @ApiModelProperty()
  readonly priority: number;

  @IsOptional()
  @IsDateString()
  @ApiModelProperty()
  readonly duedate: string;
}
