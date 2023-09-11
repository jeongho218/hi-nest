// 유효성 검사를 위한 DTO 생성
// DTO(Data Transfer Object) 데이터 전송 객체
// 영화를 생성할때는 title, year, genres만 보내도록 설정
import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional() // 필수는 아니다
  @IsString({ each: true })
  readonly genres: string[];
}
