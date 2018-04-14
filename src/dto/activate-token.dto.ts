import { IsUUID } from 'class-validator';

export class ActivateTokenDto {
  @IsUUID('4', {
    message: 'Invalid Token'
  })
  readonly token: string;
}