import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { LoggedInModule } from '../logged-in/logged-in.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Task } from '../../model/task.model';

@Module({
  imports: [
    TypegooseModule.forFeature(Task),
    LoggedInModule
  ],
  components: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
