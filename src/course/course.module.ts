import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './Course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
