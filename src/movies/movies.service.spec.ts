import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // getAll 함수의 결과는 배열이 되어야 한다.
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        // 테스트 용 영화를 생성하고
        title: 'test movie',
        genres: ['test'],
        year: 2023,
      });
      const movie = service.getOne(1); // 영화의 ID가 1인 영화를 변수 movie에 할당
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999); // 존재하지 않는 영화의 ID 999을 호출하여 에러를 발생시킨다.
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });
});
