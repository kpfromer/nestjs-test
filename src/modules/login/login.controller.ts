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
import {AuthAttemptService} from 'modules/auth-attempt/auth-attempt.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly authAttemptService: AuthAttemptService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: UserLoginDto) {

    if (await this.authAttemptService.isAbuse(user.username)) {
      throw new HttpException(
        'Maximum number of auth attempts reached. Please try again later.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (await this.userService.isUser(user.username, user.password)) {
      const userModel = await this.userService.findByUsername(user.username);
      return await this.authService.createToken(
        userModel._id,
        user.username,
      );
    }

    await this.authAttemptService.addAttempt(user.username);

    throw new HttpException(
      'Username/password do not match',
      HttpStatus.BAD_REQUEST,
    );
  }
}
