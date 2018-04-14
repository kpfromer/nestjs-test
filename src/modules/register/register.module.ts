import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { RegisterController } from './register.controller';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from 'modules/email/email.module';
import { RegisterService } from 'modules/register/register.service';

@Module({
  imports: [UserModule, AuthModule, EmailModule],
  components: [RegisterService],
  controllers: [RegisterController]
})
export class RegisterModule {}
