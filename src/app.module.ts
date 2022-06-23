import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cat/cat.module';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationMiddleWare } from './authentication/middleware/auth.middleware';
import { MongoDbModule } from './services/connection/db.provider';

@Module({
  imports: [CatsModule, AuthModule, MongoDbModule, ConfigModule.forRoot({
    envFilePath: "./.env",
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleWare).forRoutes({
      path: "/", method: RequestMethod.GET
    })
  }
}
