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

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lesson.dto';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  //   Create New Lesson
  @Post()
  createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  //   Update Lesson
  @Patch()
  updateLesson(
    @Body() updateLessonDto: UpdateLessonDto,
    @Param('lId') lId: string,
  ) {
    return this.lessonService.updateLesson(updateLessonDto, lId);
  }

  //   Update Lesson
  @Get()
  getAllLessons() {
    return this.lessonService.getAllLessons();
  }
  //   Update Lesson
  @Get(':lId')
  getOneLesson(@Param('lId') lId: string) {
    return this.lessonService.getOneLesson(lId);
  }
  //   Update Lesson
  @Delete('lId')
  deleteLesson(@Param('lId') lId: string) {
    return this.lessonService.deleteLesson(lId);
  }
}
