import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnswersDto {
  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  questionId: string;
}
