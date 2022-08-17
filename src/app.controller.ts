import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleInterceptor } from './authentication/interceptor/role.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(new RoleInterceptor(["customer"]))
  getHello(): string {
    return this.appService.getHello();
  }
}
