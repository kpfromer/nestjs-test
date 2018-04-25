import { Global, MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { AuthService } from 'modules/auth/auth.service';
import { JwtStrategy } from 'modules/auth/jwt.strategy';

@Global()
@Module({
  imports: [UserModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    // consumer
    //   .apply(passport.authenticate('jwt', { session: false }))
    //   .forRoutes('/v1/project', '/v1/task');
  }
}
