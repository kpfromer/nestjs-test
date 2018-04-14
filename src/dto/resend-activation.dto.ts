import { IsEmail } from 'class-validator';

export class ResendActivationDto {
  @IsEmail() readonly email: string;
}
