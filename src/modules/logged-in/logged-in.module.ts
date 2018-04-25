import { Module } from '@nestjs/common';
import { LoggedInService } from './logged-in.service';

@Module({
  providers: [LoggedInService],
  exports: [LoggedInService]
})
export class LoggedInModule {}
