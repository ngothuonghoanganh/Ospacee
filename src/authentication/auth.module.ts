import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/services/connection/db.provider';
import { AuthController } from './aut.controller';
import { AuthRepo } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [MongoDbModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepo],
})
export class AuthModule {}