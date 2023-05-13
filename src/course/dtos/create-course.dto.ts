import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  courseName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  levelId: string;
}
