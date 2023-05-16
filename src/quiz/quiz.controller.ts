import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  //   Create New Quiz
  @Post()
  createQuiz(@Body() createQuizDto: CreateQuizDto) {
    console.log(createQuizDto);
    return this.quizService.createQuiz(createQuizDto);
  }

  //   Update Quiz
  @Patch(':lId')
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

  // Solve Quiz
  @Get('takeQuiz/:lId')
  takeQuiz(@Param('lId') lId: string) {
    return this.quizService.takeQuiz(lId);
  }

  // Submit Answers
  @Post('submit')
  submitAnswers(
    @Body('answersIds') answers: Array<string>,
    @GetUser('id') uId: string,
    @Query() queryObj: object,
  ) {
    console.log(queryObj);

    return this.quizService.submitAnswers(answers, uId, queryObj);
  }
}
