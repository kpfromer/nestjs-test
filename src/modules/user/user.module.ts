import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'schemas/user.schema';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../../model/user.model';

@Module({
  imports: [TypegooseModule.forFeature(User)],
  components: [UserService],
  exports: [UserService]
})
export class UserModule {}
