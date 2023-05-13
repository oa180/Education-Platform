import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();

  //   Create New Subject
  async createSubject(createSubjectDto: any) {
    return await this.crud.create(this.prisma.subject, createSubjectDto);
  }

  //   Update Subject
  async updateSubject(updateSubjectDto: any, lId: any) {
    return await this.crud.update(this.prisma.subject, lId, updateSubjectDto);
  }

  //   Get All Subjects
  async getAllSubjects() {
    return await this.crud.findAll(this.prisma.subject);
  }
  //   Get One Subjectccccc
  async getOneSubject(lId: any) {
    return await this.crud.findOne(this.prisma.subject, lId);
  }
  //   Delete one Subject
  async deleteSubject(lId: any) {
    return this.crud.delete(this.prisma.subject, lId);
  }
}
