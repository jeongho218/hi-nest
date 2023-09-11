import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
// 부모 DTO(CreateMovieDto)의 모든 속성들을 물려받고, Optional이다.(모든 요소가 필수는 아니다.)
