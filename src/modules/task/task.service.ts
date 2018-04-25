import { TaskDto } from '../../dto/task.dto';
import { LoggedInService } from '../logged-in/logged-in.service';
import { InjectModel } from 'nestjs-typegoose';
import { Task } from '../../model/task.model';
import { ModelType, InstanceType } from 'typegoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private readonly taskModel: ModelType<Task>,
    private readonly loggedInService: LoggedInService
  ) {}

  // TODO: create auth service that runs these commands limiting by user id

  async getTasks(): Promise<InstanceType<Task>[]> {
    return await this.loggedInService.getAll(this.taskModel);
  }

  async createTask(task: TaskDto) {
    return await this.loggedInService.create(this.taskModel, task);
  }

  async getTaskById(id: string): Promise<InstanceType<Task>> {
    return await this.loggedInService.getById(this.taskModel, id);
  }

  async updateById(id: string, newTask: TaskDto) {
    return await this.loggedInService.updateById(this.taskModel, id, newTask);
  }

  async deleteTaskById(id: string) {
    return await this.loggedInService.deleteById(this.taskModel, id);
  }
}
