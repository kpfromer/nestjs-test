import { IsHexColor, IsString } from 'class-validator';

export class ProjectDto {
  @IsString()
  readonly name: string;

  @IsHexColor()
  readonly color: string;
}