import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

// 서비스는 로직을 관리하는 역할을 가진다.
// 한 개의 요소는 반드시 한 가지 기능은 책임져야 한다.

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    } // 존재하지 않는 영화 ID를 조회하였을때 에러처리
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id); // 상단에 작성해 두었던 에러 처리를 그대로 재사용
    this.movies = this.movies.filter((movie) => movie.id !== id); // 파라미터로 받은 영화 ID와 일치하지 않는 영화 목록만으로 새로운 배열을 생성
  }

  create(movieData: CreateMovieDto) {
    // 유효성 검사를 위한 DTO 설정
    // 영화를 생성할때는 title, year, genres만 보내도록 설정
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData) {
    const movie = this.getOne(id); // 영화 ID로 검색, 존재하지 않는다면 에러처리
    this.deleteOne(id); // 기존에 존재하던 영화 정보를 삭제
    this.movies.push({ ...movie, ...updateData }); // 같은 영화 ID에 업데이트 정보를 삽입
    // 현재 DB에 연결하지 않고 메모리 위에 데이터를 저장하기 때문에 이렇게 진행
    // nest.js를 통한 API 구축 연습을 위한 것이지 이것이 최선의 방법이 아님
  }
}
