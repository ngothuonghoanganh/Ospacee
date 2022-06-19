import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cat/cat.module';
import { } from 'mongodb'
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [CatsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
