import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    // localhost:3000의 내용이 됨
    return 'Welcome to my Movie API';
  }
}
