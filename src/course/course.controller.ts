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

import { CourseService } from './Course.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/factory/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { CreateCourseDto } from './dtos/create-course.dto';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  //   Create New Course
  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  //   Update Course
  @Patch()
  updateCourse(
    @Body() updateCourseDto: UpdateCourseDto,
    @Param('lId') lId: string,
  ) {
    return this.courseService.updateCourse(updateCourseDto, lId);
  }

  //   Update Course
  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }
  //   Update Course
  @Get(':lId')
  getOneCourse(@Param('lId') lId: string) {
    return this.courseService.getOneCourse(lId);
  }
  //   Update Course
  @Delete('lId')
  deleteCourse(@Param('lId') lId: string) {
    return this.courseService.deleteCourse(lId);
  }
}
