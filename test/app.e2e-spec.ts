import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'; // e2e 테스트
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();
  // 테스트의 설정이 beforeEach일 경우
  // 매 테스트 마다 필요한 어플리케이션을 새로 생성하고, 테스트 후 삭제하게 된다.

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // 이를 beforeAll로 바꿈으로써 테스트 끼리 진행 상황을 공유한다.
    // 예를 들어 POST 테스트에서 생성된 내용을 GET이나 PATCH에서도 별도 생성없이 테스트가 가능하다.

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // 데이터 타입의 자동 변환
        // getOne이나 update 등 URL에 영화 ID를 입력할때
        // string이던 파라미터를 number로 받아오던 기능을
        // 테스트를 위해서도 사용
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/') // URL '/'에 대한 request(controller, service, pipe)를 모두 테스트한다.
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()) // http://localhost:3000/movies와 동일하다
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => {
      // 정상적인 요청 테스트
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2023, genres: ['test'] })
        .expect(201);
    });
    it('POST 400', () => {
      // 잘못된 요청 테스트
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2023, genres: ['test'], wrong: 'thing' })
        .expect(400);
    });
    // validationPipe의 forbidNonWhitelisted 화이트 리스트에 의해
    // 허가받지 않은 리퀘스트는 차단된다.
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
