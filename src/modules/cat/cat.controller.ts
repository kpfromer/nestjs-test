import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Cat } from './cat.model';
import { ModelType } from 'typegoose';

@Controller('cat')
export class CatController {

  constructor(@InjectModel(Cat) private readonly catModel: ModelType<Cat>) {}

  @Get()
  async getCats() {
    return await this.catModel.find({}).exec();
  }

  @Post()
  async createCat(@Body() cat: Cat) {
    return await this.catModel.create(cat);
  }
}
