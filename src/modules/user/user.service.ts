import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from 'schemas/user.schema';
import { IUser } from 'interfaces/user.interface';
import * as Config from 'config';
import * as ms from 'ms';
import { UserDto } from 'dto/user.dto';
import * as moment from 'moment';

@Component()
export class UserService {
  constructor(
    @InjectModel(UserSchema) private readonly userModel: Model<IUser>
  ) {}

  async register(newUser: UserDto): Promise<IUser> {
    const createUser = new this.userModel(newUser);
    return await createUser.save();
  }

  async setAsActive(activeId: string) {
    const condition = {
      'activateAccount.token': activeId,
      'activateAccount.expires': { $gt: moment() }
    };

    const setActive = {
      $set: {
        isActive: true
      },
      $unset: {
        activateAccount: undefined
      }
    };

    return await this.userModel.findOneAndUpdate(condition, setActive).exec();
  }

  async resetActivateAccount(email: string, id: string) {
    const activateAccount = {
      token: id,
      expires: moment().add(ms(Config.get('/emailVerification/emailTokenExpiration')), 'ms')
    };

    return await this.userModel
      .findOneAndUpdate({ email, isActive: false }, { activateAccount })
      .exec();
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async doesUsernameOrEmailExist(
    username: string,
    email: string
  ): Promise<{ username: boolean; email: boolean }> {
    const user = await this.userModel
      .findOne({ $or: [{ username }, { email }] })
      .exec();

    if (!user) {
      return {
        username: false,
        email: false
      };
    }

    return {
      username: user.username === username,
      email: user.email === email
    };
  }

  // TODO: make more efficient by also return user (saving one mongo call)
  async getValidUser(username: string, password: string): Promise<IUser | null> {
    const user = await this.findByUsername(username);

    if (user && await user.matchPassword(password)) {
      return user;
    }

    return null;
  }
}
