import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RegisterController } from './register.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [RegisterController]
})
export class RegisterModule {}
