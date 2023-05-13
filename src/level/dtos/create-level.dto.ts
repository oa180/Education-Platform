import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
  @IsNotEmpty()
  @IsString()
  levelName: string;
}
