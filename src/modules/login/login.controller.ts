import {
  Body,
  Controller, HttpCode,
  HttpException,
  HttpStatus,
  Post
} from '@nestjs/common';
import {AuthService} from 'modules/auth/auth.service';
import {UserService} from 'modules/user/user.service';
import {UserLoginDto} from 'dto/user-login.dto';

@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: UserLoginDto) {
    if (await this.userService.isUser(user.username, user.password)) {
      const userModel = await this.userService.findByUsername(user.username);
      return await this.authService.createToken(
        userModel._id,
        user.username,
      );
    }

    throw new HttpException(
      'Username/password do not match',
      HttpStatus.BAD_REQUEST,
    );
  }
}
