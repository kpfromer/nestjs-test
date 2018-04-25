import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { LoginController } from './login.controller';
import { UserModule } from '../user/user.module';
import { GetIpMiddleware } from 'middleware/get-ip.middleware';
import { AuthAttemptModule } from 'modules/auth-attempt/auth-attempt.module';

@Module({
  imports: [UserModule, AuthAttemptModule],
  controllers: [LoginController]
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
    consumer.apply(GetIpMiddleware).forRoutes(LoginController);
  }
}
