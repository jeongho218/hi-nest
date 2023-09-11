import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

// 서비스는 로직을 관리하는 역할을 가진다.
// 한 개의 요소는 반드시 한 가지 기능은 책임져야 한다.

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  deleteOne(id: string): boolean {
    this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
