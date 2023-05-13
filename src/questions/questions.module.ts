import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './Questions.service';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
