import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from 'schemas/user.schema';
import { IUser } from 'interfaces/user.interface';

@Component()
export class UserService {
  constructor(
    @InjectModel(UserSchema) private readonly userModel: Model<IUser>,
  ) {}

  async register(newUser: IUser): Promise<IUser> {
    const createUser = new this.userModel(newUser);
    return await createUser.save();
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async isUser(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);

    if (user) {
      return await user.matchPassword(password);
    }

    return false;
  }
}
