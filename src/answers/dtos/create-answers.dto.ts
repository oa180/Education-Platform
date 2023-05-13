import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswersDto {
  @IsNotEmpty()
  @IsString()
  questionId: string;
}
