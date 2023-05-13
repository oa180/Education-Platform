import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  subjectName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;
}
