import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './Answers.service';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
