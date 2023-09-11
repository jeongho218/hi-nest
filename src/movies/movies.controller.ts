import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies') // "localhost:3000/movies"
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id') // "localhost:3000/movies/..."
  getOne(@Param('id') movieId: string): Movie {
    // 파라미터 등의 요청사항(req)은 함수의 ()안에 들어간다.
    // 파라미터 "id"를 매개변수 "movieId"에 저장하며, 데이터 타입은 string이다.
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    // Body에 담긴 내용을 변수 movieData에 할당한다.
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}
