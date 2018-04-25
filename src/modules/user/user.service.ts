import * as Config from 'config';
import * as ms from 'ms';
import { UserDto } from 'dto/user.dto';
import * as moment from 'moment';
import { User } from '../../model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, InstanceType } from 'typegoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ModelType<User>
  ) {}

  async register(newUser: UserDto): Promise<InstanceType<User>> {
    const createUser = new this.userModel(newUser);
    return await createUser.save();
  }

  async setAsActive(activeId: string): Promise<InstanceType<User> | null> {
    const condition = {
      'activateAccount.token': activeId,
      'activateAccount.expires': { $gt: moment().toDate() }
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

  async resetActivateAccount(email: string, id: string): Promise<InstanceType<User> | null> {
    const activateAccount = {
      token: id,
      expires: moment().add(ms(Config.get('/emailVerification/emailTokenExpiration')), 'ms')
    };

    return await this.userModel
      .findOneAndUpdate({ email, isActive: false }, { activateAccount })
      .exec();
  }

  async findByUsername(username: string): Promise<InstanceType<User> | null> {
    return await this.userModel.findOne({ username }).exec();
  }
  async findByEmail(email: string): Promise<InstanceType<User> | null> {
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

  async getValidUser(username: string, password: string): Promise<InstanceType<User> | null> {
    const user = await this.findByUsername(username);

    if (user && await user.matchPassword(password)) {
      return user;
    }

    return null;
  }
}
