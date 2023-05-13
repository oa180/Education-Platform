import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  quizName: string;
}
