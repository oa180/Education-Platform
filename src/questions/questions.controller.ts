import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { QuestionsService } from './Questions.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CreateQuestionsDto } from './dtos/create-questions.dto';
import { UpdateQuestionsDto } from './dtos/update-questions.dto';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  //   Create New Questions
  @Post()
  createQuestions(@Body() createQuestionsDto: CreateQuestionsDto) {
    return this.questionsService.createQuestions(createQuestionsDto);
  }

  //   Update Questions
  @Patch()
  updateQuestions(
    @Body() updateQuestionsDto: UpdateQuestionsDto,
    @Param('lId') lId: string,
  ) {
    return this.questionsService.updateQuestions(updateQuestionsDto, lId);
  }

  //   Update Questions
  @Get()
  getAllQuestionss() {
    return this.questionsService.getAllQuestionss();
  }
  //   Update Questions
  @Get(':lId')
  getOneQuestions(@Param('lId') lId: string) {
    return this.questionsService.getOneQuestions(lId);
  }
  //   Update Questions
  @Delete('lId')
  deleteQuestions(@Param('lId') lId: string) {
    return this.questionsService.deleteQuestions(lId);
  }
}
