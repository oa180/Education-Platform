import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  lessonName: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  subjectId: string;
}
