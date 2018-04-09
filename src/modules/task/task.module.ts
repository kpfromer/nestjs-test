import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskSchema } from '../../schemas/task.schema';
import { LoggedInModule } from '../logged-in/logged-in.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    LoggedInModule
  ],
  components: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
