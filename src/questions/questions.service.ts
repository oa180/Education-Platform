import { Injectable } from '@nestjs/common';
import { CRUD } from 'src/factory/crud.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}
  // Classes Instances
  crud = new CRUD();

  //   Create New Questions
  async createQuestions(createQuestionsDto: any) {
    await this.crud.findOne(this.prisma.quiz, createQuestionsDto.quizId);
    return await this.crud.create(this.prisma.questions, createQuestionsDto);
  }

  //   Update Questions
  async updateQuestions(updateQuestionsDto: any, lId: any) {
    return await this.crud.update(
      this.prisma.questions,
      lId,
      updateQuestionsDto,
    );
  }

  //   Get All Questionss
  async getAllQuestionss() {
    return await this.crud.findAll(this.prisma.questions);
  }
  //   Get One Questionsccccc
  async getOneQuestions(lId: any) {
    // return await this.crud.findOne(this.prisma.questions, lId);
    return await this.prisma.questions.findUnique({
      where: { id: lId },
      include: { answers: true },
    });
  }
  //   Delete one Questions
  async deleteQuestions(lId: any) {
    return this.crud.delete(this.prisma.questions, lId);
  }
}
