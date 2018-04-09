import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import {UserDto} from 'dto/user.dto';
import {IUser} from 'interfaces/user.interface';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async register(@Body() user: UserDto) {
    if (await this.userService.findByUsername(user.username)) {
      throw new HttpException('Username is taken', HttpStatus.CONFLICT);
    } else if (await this.userService.findByEmail(user.email)) {
      throw new HttpException('Email is taken', HttpStatus.CONFLICT);
    }

    const createdUser = await this.userService.register(user as IUser);

    return await this.authService.createToken(createdUser._id, user.username);
  }
}
