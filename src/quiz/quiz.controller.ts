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

import { QuizService } from './Quiz.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { UpdateQuizDto } from './dtos/update-quiz.dto';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  //   Create New Quiz
  @Post()
  createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  //   Update Quiz
  @Patch()
  updateQuiz(@Body() updateQuizDto: UpdateQuizDto, @Param('lId') lId: string) {
    return this.quizService.updateQuiz(updateQuizDto, lId);
  }

  //   Update Quiz
  @Get()
  getAllQuizs() {
    return this.quizService.getAllQuizs();
  }
  //   Update Quiz
  @Get(':lId')
  getOneQuiz(@Param('lId') lId: string) {
    return this.quizService.getOneQuiz(lId);
  }
  //   Update Quiz
  @Delete('lId')
  deleteQuiz(@Param('lId') lId: string) {
    return this.quizService.deleteQuiz(lId);
  }
}
