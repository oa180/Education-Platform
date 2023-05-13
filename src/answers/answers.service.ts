import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();

  //   Create New Answers
  async createAnswers(createAnswersDto: any) {
    return await this.crud.create(this.prisma.answers, createAnswersDto);
  }

  //   Update Answers
  async updateAnswers(updateAnswersDto: any, lId: any) {
    return await this.crud.update(this.prisma.answers, lId, updateAnswersDto);
  }

  //   Get All Answerss
  async getAllAnswerss() {
    return await this.crud.findAll(this.prisma.answers);
  }
  //   Get One Answersccccc
  async getOneAnswers(lId: any) {
    return await this.crud.findOne(this.prisma.answers, lId);
  }
  //   Delete one Answers
  async deleteAnswers(lId: any) {
    return this.crud.delete(this.prisma.answers, lId);
  }
}
