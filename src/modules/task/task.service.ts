import {Component} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {TaskSchema} from '../../schemas/task.schema';
import {ITask} from '../../interfaces/task.interface';
import {TaskDto} from "../../dto/task.dto";
import {LoggedInService} from "../logged-in/logged-in.service";
import {RequestContext} from "../../middleware/request-context/request-context";

@Component()
export class TaskService {
  constructor(@InjectModel(TaskSchema) private readonly taskModel: Model<ITask>, private readonly loggedInService: LoggedInService) {}

  // TODO: create auth service that runs these commands limiting by user id

  async getTasks(): Promise<ITask[]> {
    return await this.loggedInService.getAll(this.taskModel);
  }

  async createTask(task: TaskDto) {
    return await this.loggedInService.create(this.taskModel, task);
  }

  async getTaskById(id: string): Promise<ITask> {
    return await this.loggedInService.getById(this.taskModel, id);
  }

  async updateById(id: string, newTask: TaskDto) {
    return await this.loggedInService.updateById(this.taskModel, id, newTask);
  }

  async deleteTaskById(id: string) {
    return await this.loggedInService.deleteById(this.taskModel, id);
  }
}