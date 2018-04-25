import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Token } from 'dto/token.dto';
import * as Config from 'config';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken(id: string, username: string) {
    const expiresIn = Config.get('/jwtExpire'),
      secretOrKey = Config.get('/jwtSecret');
    const user = { id, username } as Token;
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    return !!await this.userService.findByUsername(signedUser.username);
  }
}
