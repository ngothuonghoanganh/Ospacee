import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatDto } from './dto/cat.dto';
import { CRUDRepository } from 'src/services/repository/CRUD.repository';

@Injectable()
export class CatsService extends CRUDRepository<CatDto> {
  constructor() {
    super("cats")
  } 

  async createCat(createCatDto: CreateCatDto): Promise<CatDto> {
    return this.create(createCatDto as CatDto)
  }

  async findAll(): Promise<CatDto[]> {
    return this.find({},{
    })
  }
}
