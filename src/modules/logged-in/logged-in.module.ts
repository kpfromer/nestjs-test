import {Module} from "@nestjs/common";
import {LoggedInService} from "./logged-in.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  components: [
    LoggedInService
  ],
  exports: [
    LoggedInService
  ]
})
export class LoggedInModule {}