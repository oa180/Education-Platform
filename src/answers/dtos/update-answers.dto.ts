import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswersDto } from './create-Answers.dto';

export class UpdateAnswersDto extends PartialType(CreateAnswersDto) {}
