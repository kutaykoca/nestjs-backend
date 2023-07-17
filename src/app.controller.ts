/* The AppController class is a controller that handles HTTP GET requests and returns a string
response. */

/* AppController sınıfı, HTTP GET isteklerini işleyen ve bir dize döndüren bir denetleyicidir
yanıt. */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
