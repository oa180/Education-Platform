import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();

  //   Create New Lesson
  async createLesson(createLessonDto: any) {
    await this.crud.findOne(this.prisma.subject, createLessonDto.subjectId);

    return await this.crud.create(this.prisma.lesson, createLessonDto);
  }

  //   Update Lesson
  async updateLesson(updateLessonDto: any, lId: any) {
    return await this.crud.update(this.prisma.lesson, lId, updateLessonDto);
  }

  //   Get All Lessons
  async getAllLessons() {
    return await this.crud.findAll(this.prisma.lesson);
  }
  //   Get One Lessonccccc
  async getOneLesson(lId: any) {
    return await this.crud.findOne(this.prisma.lesson, lId);
  }
  //   Delete one Lesson
  async deleteLesson(lId: any) {
    return this.crud.delete(this.prisma.lesson, lId);
  }
}
