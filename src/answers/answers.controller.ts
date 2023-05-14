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

import { AnswersService } from './Answers.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CreateAnswersDto } from './dtos/create-answers.dto';
import { UpdateAnswersDto } from './dtos/update-answers.dto';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  //   Create New Answers
  @Post()
  createAnswers(@Body() createAnswersDto: CreateAnswersDto) {
    return this.answersService.createAnswers(createAnswersDto);
  }

  //   Update Answers
  @Patch(':lId')
  updateAnswers(
    @Body() updateAnswersDto: UpdateAnswersDto,
    @Param('lId') lId: string,
  ) {
    return this.answersService.updateAnswers(updateAnswersDto, lId);
  }

  //   Update Answers
  @Get()
  getAllAnswerss() {
    return this.answersService.getAllAnswerss();
  }
  //   Update Answers
  @Get(':lId')
  getOneAnswers(@Param('lId') lId: string) {
    return this.answersService.getOneAnswers(lId);
  }
  //   Update Answers
  @Delete('lId')
  deleteAnswers(@Param('lId') lId: string) {
    return this.answersService.deleteAnswers(lId);
  }
}
