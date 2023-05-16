import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LeesonType } from 'src/factory/enums/lesson-type.enum';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  lessonName: string;

  @IsEnum(LeesonType)
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  subjectId: string;

  @IsOptional()
  @IsString()
  file: string;
}
