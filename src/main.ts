import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // 화이트리스트, 허가받지 않은 리퀘스트를 차단
      // 허가된 항목은 create-movie.dto.ts에 존재하는 것들을 말함
      transform: true, // 데이터 타입의 자동 변환
      // 예를들어 getOne이나 update 등 URL에 영화 ID를 입력하면
      // 해당 파라미터는 string이었다.
      // 그렇기에 우리는 '+id' 같은 방법으로 number로 바꾸어 사용하였으나
      // 이를 class-transformer를 사용하면 아예 string인 파라미터를 리퀘스트 하면
      // controller단에서 지정한대로 number로 변환되어 요청이 들어가게된다.
    }),
  );
  await app.listen(3000);
}
bootstrap();
