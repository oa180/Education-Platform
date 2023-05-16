import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterHandler } from 'src/factory/multer.factory';
import { ErrorHandler } from 'src/factory/errorHandler';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  //   Create New Lesson
  @Post('video')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: MulterHandler.createDiskStorage('./upload/files/lessons'),
      fileFilter: MulterHandler.videoMulterFilter,
    }),
  )
  createLessonVid(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createLessonDto.file = file.path;
    return this.lessonService.createLesson(createLessonDto);
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: MulterHandler.createDiskStorage('./upload/files/lessons'),
      fileFilter: MulterHandler.fileMulterFilter,
    }),
  )
  createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createLessonDto.file = file.path;
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
