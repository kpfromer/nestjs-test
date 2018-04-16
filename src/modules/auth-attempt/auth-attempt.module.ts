import { Module } from '@nestjs/common';
import { AuthAttemptService } from 'modules/auth-attempt/auth-attempt.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthAttempt } from '../../model/auth-attempt.model';

@Module({
  imports: [TypegooseModule.forFeature(AuthAttempt)],
  components: [AuthAttemptService],
  exports: [AuthAttemptService]
})
export class AuthAttemptModule {}
