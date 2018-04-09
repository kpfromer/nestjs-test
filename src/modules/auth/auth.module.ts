import * as passport from 'passport';
import {
  MiddlewaresConsumer,
  Module,
  NestModule} from '@nestjs/common';
import {UserModule} from 'modules/user/user.module';
import {AuthService} from 'modules/auth/auth.service';
import {JwtStrategy} from 'modules/auth/jwt.strategy';
import {TaskController} from 'modules/task/task.controller';

@Module({
  imports: [UserModule],
  components: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(TaskController);
  }
}
