import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Cat } from './cat.model';

@Module({
  imports: [TypegooseModule.forFeature(Cat)],
  controllers: [CatController]
})
export class CatModule {}
