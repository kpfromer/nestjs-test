import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as Config from 'config';
import { PassportStrategy } from './passport/passport.strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // See https://www.npmjs.com/package/passport-jwt#configure-strategy for details
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: Config.get('/jwtSecret')
      }
    );
  }

  public async validate(payload, done) {
    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }

    done(null, payload);
  }
}
