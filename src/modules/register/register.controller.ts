import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from 'dto/user.dto';
import { RegisterService } from 'modules/register/register.service';
import { ResendActivationDto } from 'dto/resend-activation.dto';
import { ActivateTokenDto } from 'dto/activate-token.dto';

@Controller()
export class RegisterController {
  constructor(
    private readonly service: RegisterService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post()
  async register(@Body() user: UserDto) {
    const usernameOrEmailExist = await this.userService.doesUsernameOrEmailExist(
      user.username,
      user.email
    );

    if (usernameOrEmailExist.username && usernameOrEmailExist.email) {
      throw new HttpException('Username and email are taken', HttpStatus.CONFLICT);
    } else if (usernameOrEmailExist.username) {
      throw new HttpException('Username is taken', HttpStatus.CONFLICT);
    } else if (usernameOrEmailExist.email) {
      throw new HttpException('Email is taken', HttpStatus.CONFLICT);
    }

    const createdUser = await this.userService.register(user);

    this.service.sendWelcomeEmail(
      createdUser,
      createdUser.activateAccount.token
    );

    return await {
      message: 'Activation email sent.'
    };
  }

  @Post('send-activation-email')
  @HttpCode(HttpStatus.OK)
  async resendActivationEmail(@Body() resendActivation: ResendActivationDto) {
    const activateId = this.service.createId();
    const user = await this.userService.resetActivateAccount(
      resendActivation.email,
      activateId
    );

    if (!user) {
      throw new HttpException(
        'Invalid email or account is already active.',
        HttpStatus.BAD_REQUEST
      );
    }

    this.service.sendWelcomeEmail(user, activateId);

    return {
      message: 'Successfully resent activation email!'
    };
  }

  @Post('activate')
  async activateAccount(@Body() token: ActivateTokenDto) {
    const user = await this.userService.setAsActive(token.token);

    if (!user) {
      throw new HttpException(
        'Token is expired or invalid.',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      message: 'Successfully registered user!'
    };
  }
}
