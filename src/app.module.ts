import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // 데코레이터, NestJS에서 클래스에 함수 기능을 추가할 수 있는 곳
  // NestJS는 데코레이터와 함께 한다.
  // 클래스 위의 함수이고, 클래스를 위해 움직인다고 생각하자
  // 데코레이터는 꾸며주는 함수나 클래스와 붙어있어야 한다.

  imports: [],
  controllers: [],
  // 컨트롤러, express의 router와 같은 역할
  // url을 가져오고 함수를 실행함
  providers: [],
})
export class AppModule {}
// 앱 모듈, 모든 것의 루트 모듈 같은 느낌
// 모듈은 어플리케이션의 일부분
// 예를 들어, 인증을 담당하는 어플리케이션이 있다면, 그건 users 모듈
