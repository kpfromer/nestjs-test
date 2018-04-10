import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from '../../dto/task.dto';
import { IsObjectIdPipe } from '../../pipes/is-objectid.pipe';
import { IsNotArrayPipe } from '../../pipes/is-not-array.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  async getTasks(@Req() req) {
    return await this.service.getTasks();
  }

  @Get(':id')
  async getById(
    @Param(new IsObjectIdPipe())
    id: string
  ) {
    return await this.service.getTaskById(id);
  }

  @Post()
  async createTask(
    @Body(new IsNotArrayPipe())
    task: TaskDto
  ) {
    return await this.service.createTask(task);
  }

  @Put(':id')
  async updateTask(
    @Param(new IsObjectIdPipe())
    id: string,
    @Body(new IsNotArrayPipe())
    task: TaskDto
  ) {
    return await this.service.updateById(id, task);
  }

  @Delete(':id')
  async deleteTask(
    @Param(new IsObjectIdPipe())
    id: string
  ) {
    return await this.service.deleteTaskById(id);
  }
}
