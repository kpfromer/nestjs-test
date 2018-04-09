import { Controller, Get } from '@nestjs/common';

@Controller('cat')
export class CatController {
  @Get()
  getCats() {
    return [];
  }
}
