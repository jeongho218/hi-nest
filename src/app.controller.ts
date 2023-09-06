import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // 데코레이터, express의 get router와 같은 역할
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  // 이 경우 이 곳의 url은 'localhost:3000/hello'가 된다.
  // 현재 주석을 적기 위해 데코레이터와 함수가 떨어져 있으나
  // 데코레이터는 자신을 꾸며주는 함수나 클래스가 붙어있어야 하므로
  // 빈칸을 두지 않는 것이 좋다.
  // 괄호 같은 것으로 묶어서 종속됨을 표시하는 것이 아니기 때문에..
  sayHello(): string {
    // return 'Hello everyone';
    return this.appService.getHi();
  }
  // 이러한 방법으로 NestJS는 router를 설정하지 않아도 된다.
}

// NestJS는 컨트롤러를 비즈니스 로직과 구분 짓고 싶어한다.
// 컨트롤러는 그저 URL을 가져오고, 함수를 리턴하는 역할일 뿐이다.
// 비즈니스 로직은 서비스로 가며, 서비스가 실제로 함수를 가지고 실행하는 부분이다.
