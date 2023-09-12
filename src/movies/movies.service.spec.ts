import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { after } from 'node:test';

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
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999); // 존재하지 않는 영화의 ID 999을 호출하여 에러를 발생시킨다.
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        // 테스트 용 영화를 생성
        title: 'test movie',
        genres: ['test'],
        year: 2023,
      });
      console.log(service.getAll());
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      console.log(service.getAll());
      const afterDelete = service.getAll().length;

      // expect(afterDelete.length).toEqual(beforeDelete.length - 1);
      // 영화를 삭제한 후의 영화 배열의 길이는
      // 삭제하기 전 영화 배열의 길이에서 -1한 것과 동일하여야 한다.
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2023,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
});
