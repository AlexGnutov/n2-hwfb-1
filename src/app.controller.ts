import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { db } from "./main";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const pupko = await db.ref('puko').push({
      name: '1',
      ci: 'Ja!',
    });
    return { id: pupko.key };
  }
}
