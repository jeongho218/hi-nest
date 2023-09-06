import { Injectable } from '@nestjs/common';

@Injectable() // 데코레이터
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }
  getHi(): string {
    return 'Hi Nest';
  }
}
