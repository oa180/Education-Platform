import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionsDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  quizId: string;
}
