import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../../model/user.model';

@Module({
  imports: [TypegooseModule.forFeature(User)],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
