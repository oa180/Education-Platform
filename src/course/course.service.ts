import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();

  //   Create New Course
  async createCourse(createCourseDto: any) {
    return await this.crud.create(this.prisma.course, createCourseDto);
  }

  //   Update Course
  async updateCourse(updateCourseDto: any, lId: any) {
    return await this.crud.update(this.prisma.course, lId, updateCourseDto);
  }

  //   Get All Courses
  async getAllCourses() {
    return await this.crud.findAll(this.prisma.course);
  }
  //   Get One Courseccccc
  async getOneCourse(lId: any) {
    return await this.crud.findOne(this.prisma.course, lId);
  }
  //   Delete one Course
  async deleteCourse(lId: any) {
    return this.crud.delete(this.prisma.course, lId);
  }
}
