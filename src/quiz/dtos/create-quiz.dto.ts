import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  quizName: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  grade: number;
}
