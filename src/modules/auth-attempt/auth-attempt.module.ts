import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthAttemptSchema } from 'schemas/auth-attempt.model';
import { AuthAttemptService } from 'modules/auth-attempt/auth-attempt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AuthAttempt', schema: AuthAttemptSchema }
    ])
  ],
  components: [AuthAttemptService],
  exports: [AuthAttemptService]
})
export class AuthAttemptModule {}
