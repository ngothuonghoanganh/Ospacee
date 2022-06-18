import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cat.service';
import { CatDto } from './dto/cat.dto';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller("/cat")
export class CatController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  createCat(@Body() cat: CreateCatDto): Promise<CatDto> {
    return this.catService.create(cat)
  }

  @Get()
  getAll(): Promise<CatDto[]> {
    return this.catService.findAll()
  }
}
