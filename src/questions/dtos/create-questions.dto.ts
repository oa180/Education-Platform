import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionsDto {
  @IsNotEmpty()
  @IsString()
  quizId: string;
}
