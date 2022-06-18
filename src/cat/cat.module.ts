import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/services/connection/db.provider';
import { CatController } from './cat.controller';
import { CatsService } from './cat.service';

@Module({
  imports: [MongoDbModule],
  controllers: [CatController],
  providers: [CatsService],
})
export class CatsModule {}