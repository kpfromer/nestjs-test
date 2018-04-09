import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [LoginController],
})
export class LoginModule {}
